import { gql } from 'apollo-server'

export default gql`
  type Checker {
    id: ID!
    name: String
    card: String
  }
`
