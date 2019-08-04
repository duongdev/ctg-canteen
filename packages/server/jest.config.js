const dotenv = require('dotenv')

function dotenvConfig() {
  const ENV = process.env.NODE_ENV

  dotenv.config({ path: `.env.${ENV}.local` })
  dotenv.config({ path: `.env.${ENV}` })

  dotenv.config({ path: '.env.local' })
  dotenv.config({ path: '.env' })
}

dotenvConfig()

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  reporters: ['default', 'jest-junit'],
}
