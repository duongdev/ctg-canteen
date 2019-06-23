const defaultPort = 4000

interface Environment {
  apollo: {
    introspection: boolean
    playground: boolean
  }
  port: number | string
  mongoUri: string

  defaultAdmin: {
    username: string
    password: string
  }
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || defaultPort,
  mongoUri: process.env.MONGO_URI,
  defaultAdmin: {
    username: process.env.DEFAULT_ADMIN_USERNAME,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
  },
}
