import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    name: String!
  }
`
