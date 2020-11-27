const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`RFID Server up and running at http://${hostname}:${port}`);
});

