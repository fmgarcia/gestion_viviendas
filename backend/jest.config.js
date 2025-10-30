module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js', // Excluir archivo de entrada del servidor
  ],
  testMatch: [
    '**/tests/api/**/*.test.js',
    '**/__tests__/**/*.js'
  ],
  rootDir: '..',
  verbose: true,
  testTimeout: 10000,
};
