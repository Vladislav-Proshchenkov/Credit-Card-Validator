const { startServer } = require('../../server');

module.exports = async () => {
  global.__SERVER__ = await startServer(9000);
};