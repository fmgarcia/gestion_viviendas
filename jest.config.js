module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/api'],
  testMatch: ['**/tests/api/**/*.test.js'],
  verbose: true,
  testTimeout: 10000,
  moduleDirectories: ['node_modules', 'backend/node_modules'],
};
