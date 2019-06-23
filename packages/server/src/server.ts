import { ApolloServer } from 'apollo-server'
import chalk from 'chalk'
import debug from 'debug'
import * as mongoose from 'mongoose'

const log = debug('app:server')

import { environment } from './environment'
import resolvers from './resolvers'
import typeDefs from './schemas'

import { getUserFromToken } from 'functions/users/user-services'
import startup from 'startup'
import userGql from './functions/users/user.gql'

const server = new ApolloServer({
  resolvers,
  typeDefs: [typeDefs, userGql],
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers['x-access-token']

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

    server.listen(environment.port).then(async ({ url }) => {
      log(`Server ready at ${chalk.green(url)}.`)
    })
  })
  .catch(() => {
    log(`Couldn't connect to MongoDB at ${chalk.red(environment.mongoUri)}`)
  })
