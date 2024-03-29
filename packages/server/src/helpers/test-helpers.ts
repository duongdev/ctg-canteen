import { ApolloServer } from 'apollo-server'
import { ApolloServerExpressConfig } from 'apollo-server-express'
import { createTestClient as createTestApolloClient } from 'apollo-server-testing'
import { merge } from 'lodash'
import mockingoose from 'mockingoose'
import mongoose from 'mongoose'
import resolvers from 'resolvers'
import schemas from 'typeDefs'

export const createTestClient = (config: ApolloServerExpressConfig = {}) => {
  return createTestApolloClient(
    new ApolloServer(
      merge<ApolloServerExpressConfig, ApolloServerExpressConfig>(
        {
          resolvers,
          typeDefs: schemas,
          engine: false,
        },
        config,
      ),
    ),
  )
}

export const getObjectId = mongoose.Types.ObjectId

export const mockingooseResetAll = () => mockingoose.resetAll()
