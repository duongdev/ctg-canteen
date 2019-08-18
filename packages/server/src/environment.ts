const defaultPort = 4000
const defaultMaxFiles = 1
const defaultMaxFileSize = 10000000 // 10MB

interface Environment {
  apollo: {
    introspection: boolean
    playground: boolean
  }
  server: {
    host: string
    port: number | string
  }
  mongoUri: string
  jwtSecret: string

  defaultAdmin: {
    username: string
    password: string
  }

  upload: {
    folder: string
    maxFiles: number
    maxFileSize: number
  }
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || defaultPort,
  },
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  defaultAdmin: {
    username: process.env.DEFAULT_ADMIN_USERNAME,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
  },
  upload: {
    folder: process.env.UPLOAD_FOLDER || 'uploads',
    maxFiles: +process.env.UPLOAD_MAX_FILES || defaultMaxFiles,
    maxFileSize: +process.env.UPLOAD_MAX_FILE_SIZE || defaultMaxFileSize,
  },
}
