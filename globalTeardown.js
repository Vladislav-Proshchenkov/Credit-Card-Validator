const { stopServer } = require('./server');

module.exports = async () => {
  try {
    await stopServer();
  } catch (err) {
    console.error('Global teardown error:', err);
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (typeof process.exit === 'function') {
    process.exit(0);
  }
};