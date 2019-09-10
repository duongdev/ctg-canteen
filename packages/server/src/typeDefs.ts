import { gql } from 'apollo-server'

import Dish from 'functions/dishes/dish.gql'
import MealPeriod from 'functions/meal-periods/meal-period.gql'
import User from 'functions/users/user.gql'

export default [
  gql`
    scalar JSON
    scalar DateTime
    scalar Any

    type Query {
      _empty: String
    }
    type Mutation {
      _empty: String
    }
  `,
  Dish,
  MealPeriod,
  User,
]
