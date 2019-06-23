import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    name: String!
  }

  extend type Query {
    authenticate: User
  }

  extend type Mutation {
    signIn(username: String!, password: String!): String
  }
`
