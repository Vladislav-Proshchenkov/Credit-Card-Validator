const express = require('express');
const path = require('path');
const http = require('http');

let serverInstance = null;

module.exports = {
  startServer: async (port) => {
    if (serverInstance) return serverInstance;

    const app = express();
    app.use(express.static(path.join(__dirname, 'dist')));

    serverInstance = http.createServer(app);
    
    return new Promise((resolve, reject) => {
      serverInstance.listen(port)
        .once('listening', () => {
          console.log(`Test server running on port ${port}`);
          resolve(serverInstance);
        })
        .once('error', reject);
    });
  },

  stopServer: async () => {
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
  }
};