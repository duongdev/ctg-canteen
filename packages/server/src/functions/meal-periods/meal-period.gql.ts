import { gql } from 'apollo-server'

export default gql`
  type MealPeriod {
    id: ID!
    name: String
    createdByUserId: String!
    createdByUser: User
    registrationStartsAt: DateTime
    registrationEndsAt: DateTime
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateMealPeriodInput {
    name: String
    registrationStartsAt: DateTime
    registrationEndsAt: DateTime
  }

  extend type Mutation {
    createMealPeriod(input: CreateMealPeriodInput!): MealPeriod
  }
`
