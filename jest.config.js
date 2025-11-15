module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/client', '<rootDir>/server', '<rootDir>/test'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/styleMock.js',
    '^@components/(.*)$': '<rootDir>/client/Components/$1',
    '^@containers/(.*)$': '<rootDir>/client/Containers/$1',
    '^@utils/(.*)$': '<rootDir>/client/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  collectCoverageFrom: [
    'client/**/*.{js,jsx,ts,tsx}',
    'server/**/*.{js,jsx,ts,tsx}',
    '!client/dist/**',
    '!client/graph/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/client/dist/', '/release-builds/'],
  watchPathIgnorePatterns: ['/node_modules/', '/client/dist/', '/release-builds/'],
};
