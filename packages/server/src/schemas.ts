import { gql } from 'apollo-server'

import Checker from 'functions/checkers/checker.gql'
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
  Checker,
  User,
]
