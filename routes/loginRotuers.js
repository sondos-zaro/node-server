const { getUsers, getUser, logginPage, registerPage, addUser, loggin, displayPaginatedUsers, logout } = require('../controllers/userController')

function router(req, res) {
    switch(req.method) {
        case 'GET':
            getHandler(req, res);
            break;
        case 'POST':
            postHandler(req, res);
            break;    
        default:
            errorHandler(req, res);
            break;      
    }
}

function getHandler(req, res) {
    if(req.url.match('/users/page=[0-9]+')) {
        displayPaginatedUsers(req, res);
        return;
    }
    switch(req.url) {
        case '/loggin':
            logginPage(req, res);
            break;
        case '/logout':
            logout(req, res);
            break;            
        case '/register':
            registerPage(req, res);
            break; 
        case '/users':
            getUsers(req, res);
            break; 
        case '/user':
            getUser(req, res);
            break;        
        default:
            errorHandler(req, res);
            break;      
    }
}

function postHandler(req, res) {
    switch(req.url) {
        case '/loggin':
            loggin(req, res);
            break;
        case '/register':
            addUser(req, res);
            break;    
        default:
            errorHandler(req, res);
            break;      
    }
}

    // } else if(req.method === 'GET' && req.url.match('/users/[0-9]+') ) {
    //     const id = req.url.split('/')[2];
    //     getUser(req, res, id);
    // } else 


function errorHandler(req, res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify( {massege : "Page not found"} )); 
}


module.exports ={ router }