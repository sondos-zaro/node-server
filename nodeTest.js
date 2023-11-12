var fs = require('fs');
var querystring = require('querystring');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let path = './views';

    res.setHeader('Content-Type', 'text/html');
    switch(req.method) {
        case 'POST':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                let parse = querystring.parse(body);
               // res.send(parse);
                //req.url = 'welcome.html';
                console.log(req.url)    
               res.end();
            });
            break;
        case 'GET':
            req.url = '/';
            break;
        // default:

        //     break;            
    }
    console.log(req.url)
    // switch(req.url) {
    //     case '/':
    //         path += '/index.html';
    //         res.statusCode = 200;
    //         break;
    //     case '/welcome':
    //         path += '/welcome.html';
    //         res.statusCode = 200;
    //         break;
    //     default:
    //         path += '/error.html'; 
    //         res.statusCode = 404;
    //         break;            
    // }

    html = fs.readFileSync(path);
    res.write(html);
    res.end();



    // if(req.method === 'POST') {
    //     let body = '';
    //     req.on('data', chunk => {
    //         body += chunk.toString(); // convert Buffer to string
    //     });
    //     req.on('end', () => {
    //         let parse = querystring.parse(body);
    //         res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    //         res.end(`Welcome ${ parse.firstName } ${ parse.lastName } 🎈🎆`);
    //     });
    
//     } else if (req.method === "GET") {
//         res.setHeader('Content-Type', 'text/html');
//         html = fs.readFileSync('./index.html');
//         res.write(html);
//         res.end();
//     }
 });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



