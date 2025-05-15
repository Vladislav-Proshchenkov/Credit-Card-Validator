const http = require('http');
const fs = require('fs');
const path = require('path');

let serverInstance = null;

module.exports = {
  startServer: (port) => {
    return new Promise((resolve) => {
      if (serverInstance) return resolve(serverInstance);

      serverInstance = http.createServer((req, res) => {
        const filePath = path.join(__dirname, 'dist', 
          req.url === '/' ? 'index.html' : req.url);
        
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404);
            return res.end('Not found');
          }
          res.writeHead(200);
          res.end(data);
        });
      });

      serverInstance.listen(port, () => {
        console.log(`Test server running on port ${port}`);
        resolve(serverInstance);
      });
    });
  },

  stopServer: () => {
    return new Promise((resolve) => {
      if (!serverInstance) return resolve();
      
      serverInstance.close(() => {
        console.log('Test server stopped');
        serverInstance = null;
        resolve();
      });
    });
  }
};