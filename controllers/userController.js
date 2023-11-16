const User = require('../models/userModel');
const querystring = require('querystring');
const fs = require('fs');
const pagination = require('pagination')


async function getUsers(req, res) {
    try {
        const users =  User.findUsers();
    
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
        
    } catch (error) {
        console.log(error);
    }
}

async function getUser(req, res) {
    try {
        console.log(req.headers.cookie);
        const id = parseCookies(req).id;
        if(id) {
            const user = await User.findUserById(id);
            if(user) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify( {massege : "User not found"} ));
            }
        }
        

        

        
    } catch (error) {
        console.log(error);
    }
}

async function logginPage(req, res) {
    try {
        const id = parseCookies(req).id;
        if(id) {
            res.writeHead(302, {
                'Location': '/user'
              });
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            html = fs.readFileSync('./views/login.html');
            res.write(html);
            res.end();
        }
        
        
    } catch (error) {
        console.log(error);
    }
}

async function registerPage(req, res) {
    try {
        res.writeHead(200, { "Content-Type": "text/html" });
        html = fs.readFileSync('./views/register.html');
        res.write(html);
        res.end();
        
    } catch (error) {
        console.log(error);
    }
}

async function addUser(req, res) {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let user = querystring.parse(body);
            User.addUser(user);
            const userId = User.getUserId(user.username);
            if (user !== undefined) {
                res.writeHead(200, {
                    "Set-Cookie": `mycookie= ${userId}`,
                    "Content-Type": `application/json`
                });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, {"Content-Type": `text/plain`});
                res.end(JSON.stringify( {massege : "register again"} ));
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function loggin(req, res) {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let user = querystring.parse(body);
            user = User.findLogginUser(user);
            if (user !== undefined) {
                res.writeHead(302, {
                    'Location': '/user',
                    "Set-Cookie": `id = ${user.id}`,
                  });
                res.end();
            } else {
                res.writeHead(200, {"Content-Type": `text/plain`});
                res.end(JSON.stringify( {massege : "Email Or password incorrecrt"} ));
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

function paginationUsers(itemPerPage) {
    const users = User.findUsers();
    let pages = users.length/itemPerPage;
    let userArr = [];
    let userSlice;
    pages = Math.ceil(pages);
    for(let i = 0; i<=pages;i++) {
        userSlice=  users.slice(i, i + itemPerPage);
        
        userArr.push(userSlice);
    }

    return userArr;
}
function displayPaginatedUsers(req, res) {
    const paginatedUsers = paginationUsers(2);
    const pageNumber = req.url.split('=')[1];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(paginatedUsers[pageNumber]));
}

function logout(req, res) {
    res.writeHead(302, {
        'Location': '/loggin',
        "Set-Cookie":`id={};Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    });
    res.end();
}

module.exports = { getUsers, getUser, logginPage, registerPage, addUser, loggin, displayPaginatedUsers, logout }
