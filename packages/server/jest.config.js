module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  reporters: ['default', 'jest-junit'],
}
