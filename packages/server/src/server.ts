import { ApolloServer } from 'apollo-server'
import chalk from 'chalk'
import debug from 'debug'
import mongoose from 'mongoose'

const log = debug('app:server')

import { environment } from './environment'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

import { getUserFromToken } from 'functions/users/user.services'
import startup from 'startup'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  uploads: {
    maxFileSize: environment.upload.maxFileSize,
    maxFiles: environment.upload.maxFiles,
  },
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers['x-access-token'] as string

    if (token) {
      // try to retrieve a user with the token
      const user = await getUserFromToken(token)

      console.log(user)

      // add the user to the context
      return { user }
    }
  },
})

mongoose
  .connect(environment.mongoUri, { useNewUrlParser: true })
  .then(async () => {
    log(`MongoDB connected: ${chalk.green(environment.mongoUri)}`)

    await startup()

    server.listen(environment.server).then(async ({ url }) => {
      log(`Server ready at ${chalk.green(url)}.`)
    })
  })
  .catch((error) => {
    log(`Couldn't start server`)
    log(error)
  })
