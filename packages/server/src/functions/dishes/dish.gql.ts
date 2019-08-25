import { gql } from 'apollo-server'

export default gql`
  type Dish {
    id: ID!
    name: String!
    images: [String]
    price: Float
  }
`
