module.exports = {
  testEnvironment: 'node',
  testTimeout: 60000,
  globalTeardown: './globalTeardown.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  detectOpenHandles: true,
  forceExit: true
};