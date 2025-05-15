const express = require('express');
const path = require('path');
const http = require('http');

let serverInstance = null;

const startServer = async (port) => {
  if (serverInstance) return serverInstance;

  const app = express();
  
  if (!Object.hasOwn) {
    Object.hasOwn = function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }

  app.use(express.static(path.join(__dirname, 'dist')));

  serverInstance = http.createServer(app);
  
  return new Promise((resolve, reject) => {
    serverInstance.listen(port, () => {
      console.log(`Test server running on port ${port}`);
      resolve(serverInstance);
    }).on('error', reject);
  });
};

const stopServer = async () => {
  if (!serverInstance) return;
  
  return new Promise((resolve) => {
    serverInstance.close(() => {
      console.log('Test server stopped');
      serverInstance = null;
      resolve();
    });
    
    setTimeout(() => {
      if (serverInstance) {
        serverInstance.close(() => {
          console.log('Test server force stopped');
          serverInstance = null;
          resolve();
        });
      }
    }, 1000);
  });
};

module.exports = { startServer, stopServer };