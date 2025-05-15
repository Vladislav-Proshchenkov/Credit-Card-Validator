const { stopServer } = require('./server');

module.exports = async () => {
  try {
    await stopServer();
  } catch (error) {
    console.error('Global teardown error:', error);
  }
};