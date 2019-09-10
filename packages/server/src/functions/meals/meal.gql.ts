import { gql } from 'apollo-server'

export default gql`
  type Meal {
    id: ID!
    type: String!
    date: DateTime!
    dishIds: [String]!
    dishes: [Dish]
    mealPeriodId: String!
    mealPeriod: MealPeriod
    createdByUserId: String!
    createdByUser: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateMealInput {
    mealPeriodId: String!
    type: String!
    dishIds: [String!]!
    date: DateTime!
  }

  extend type Mutation {
    createMeal(input: CreateMealInput!): Meal
  }
`
