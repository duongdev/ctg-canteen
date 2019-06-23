import { gql } from 'apollo-server'

export default gql`
  scalar JSON
  scalar DateTime
  scalar Any

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
