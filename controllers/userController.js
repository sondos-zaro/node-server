const User = require('../models/userModel');
var querystring = require('querystring');
var fs = require('fs');


async function getUsers(req, res) {
    try {
        const users = await User.findUsers();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
        
    } catch (error) {
        console.log(error);
    }
}

async function getUser(req, res, id) {
    try {
        const user = await User.findUser(id);
        
        if(user) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify( {massege : "User not found"} ));
        }

        
    } catch (error) {
        console.log(error);
    }
}

async function addUser(req, res) {
    try {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            let user = querystring.parse(body);
            User.addUser(user);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        })
    } catch (error) {
        console.log(error);
    }
}

async function loggin(req, res) {
    try {

        res.writeHead(200, { "Content-Type": "text/html" });
        html = fs.readFileSync('./views/index.html');
        res.write(html);
        res.end();
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers, getUser, addUser, loggin }
