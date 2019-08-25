import { gql } from 'apollo-server'

export default gql`
  type Dish {
    id: ID!
    name: String!
    images: [String]
    price: Float
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateDishInput {
    name: String!
    images: [String]
    price: Float!
  }

  extend type Mutation {
    createDish(input: CreateDishInput!): Dish
  }

  input DishesInput {
    limit: Int
    page: Int
    sortBy: String
  }

  type DishPagination {
    total: Int
    page: Int
    pages: Int
    limit: Int
    edges: [Dish]
  }

  extend type Query {
    dishes(input: DishesInput): DishPagination
  }
`
