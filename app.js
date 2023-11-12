const { getUsers, getUser, addUser, loggin } = require('./controllers/userController')
const http = require('http');
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res)=> {

    if(req.method === 'GET' && req.url === '/users') { 
        getUsers(req, res);
    } else if(req.method === 'GET' && req.url.match('/users/[0-9]+') ) {
        const id = req.url.split('/')[2];
        getUser(req, res, id);
    } else if(req.method === 'POST' && req.url === '/users') {
        console.log("add1")
        addUser(req, res);
    } else if(req.method === 'GET' && req.url === '/loggin') { 
        loggin(req, res);
    } 
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify( {massege : "Page not found"} ));
    }
})

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${ hostname }:${ PORT }/`);
  });