module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/tests/__mocks__/styleMock.js',
  },
  collectCoverageFrom: ['src/**/*.js', '!src/tests/**'],
};
