module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  transform: {
    '\\.css\\.ts$': '@vanilla-extract/jest-transform',
    '.(ts|tsx)': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/styleMock.js',
  }
};