import { ApolloServer } from 'apollo-server-express'
import chalk from 'chalk'
import debug from 'debug'
import express from 'express'

import mongoose from 'mongoose'

const log = debug('app:server')

import { environment } from './environment'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

import { getUserFromToken } from 'functions/users/user.services'
import startup from 'startup'
import { staticFolder } from 'utils/file-storage'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  // TODO: Can configure for specific mutation
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

const app = express()

app.use('/public', express.static(staticFolder))

server.applyMiddleware({ app })

mongoose
  .connect(environment.mongoUri, { useNewUrlParser: true })
  .then(async () => {
    log(`MongoDB connected: ${chalk.green(environment.mongoUri)}`)

    await startup()

    app.listen(environment.server, () => {
      const url = `http://${environment.server.host}:${environment.server.port}${server.graphqlPath}`
      console.log(`🚀 Server ready at ${url}`)
      log(`Server ready at ${chalk.green(url)}.`)
    })
  })
  .catch((error) => {
    log(`Couldn't start server`)
    log(error)
  })
