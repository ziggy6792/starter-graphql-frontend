/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json');
const package = require('./package.json');

module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  moduleNameMapper: {},
  collectCoverageFrom: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/stack.ts',
    '!**/cdk.out/**',
    '!**/test/**',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
  transformIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
  watchPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['/dist/', '/build/'],
  verbose: true,
  collectCoverage: false,
  name: package.name,
  displayName: package.name,
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./src/utils/jest-setup.ts'],
  testEnvironment: 'jsdom',
};
