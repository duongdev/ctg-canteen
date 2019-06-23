import { ApolloServer } from 'apollo-server'
import chalk from 'chalk'
import debug from 'debug'
import * as mongoose from 'mongoose'

const log = debug('app:server')

import { environment } from './environment'
import resolvers from './resolvers'
import typeDefs from './schemas'

import userGql from './functions/users/user.gql'

const server = new ApolloServer({
  resolvers,
  typeDefs: [typeDefs, userGql],
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
})

mongoose
  .connect(environment.mongoUri, { useNewUrlParser: true })
  .then(() => {
    log(`MongoDB connected: ${chalk.green(environment.mongoUri)}`)

    server
      .listen(environment.port)
      .then(({ url }) => log(`Server ready at ${chalk.green(url)}.`))
  })
  .catch(() => {
    log(`Couldn't connect to MongoDB at ${chalk.red(environment.mongoUri)}`)
  })

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
