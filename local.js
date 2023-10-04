const http = require('http');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status-codes');

const port = 3001;
const assetsDirectory = 'assets'; // CSS files will be loaded from here

const server = http.createServer((request, response) => {
    const url = request.url === '/' ? '/index.html' : request.url; // Default to index.html for root URL
    const filePath = path.join(__dirname, url);

    fs.readFile(filePath, (error, data) => {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(httpStatus.NOT_FOUND, { 'Content-Type': 'text/html' });
                response.end('<h1>File Not Found</h1>');
            } else {
                response.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { 'Content-Type': 'text/html' });
                response.end('<h1>Internal Server Error</h1>');
            }
        } else {
            let contentType = 'text/html';
            if (filePath.endsWith('.css')) {
                contentType = 'text/css';
            }

            response.writeHead(httpStatus.OK, { 'Content-Type': contentType });
            response.write(data);
            response.end();
        }
    });
});

server.listen(port, () => {
    console.log(`The server is listening on port: ${port}`);
});