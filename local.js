const http = require('http');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status-codes');

const port = 3000;
const viewsDirectory = 'views';

const server = http.createServer((request, response) => {
    const url = request.url === '/' ? '/index.html' : request.url; // Default to index.html for root URL
    const filePath = path.join(__dirname, viewsDirectory, url);

    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(httpStatus.NOT_FOUND, { 'Content-Type': 'text/html' });
            response.end('<h1>File Not Found</h1>');
        } else {
            response.writeHead(httpStatus.OK, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        }
    });
});

server.listen(port, () => {
    console.log('The server is listening on port: ${port}');
});