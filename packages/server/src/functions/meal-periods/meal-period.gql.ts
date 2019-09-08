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

  input MealPeriodsFilter {
    search: String
    registrationStartSince: DateTime
    registrationStartUntil: DateTime
    registrationEndSince: DateTime
    registrationEndUntil: DateTime
    offset: Int
    limit: Int
    orderBy: String
  }

  type MealPeriodsResult {
    total: Int
    offset: Int
    limit: Int
    mealPeriods: [MealPeriod]
  }

  extend type Query {
    mealPeriods(filter: MealPeriodsFilter): MealPeriodsResult
  }
`
