const { router } = require('./routes/loginRotuers')
const http = require('http');
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res)=> {
    router(req, res);
})

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${ hostname }:${ PORT }/`);
  });