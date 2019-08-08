import { findChecker } from 'functions/checkers/checker.services'
import * as Mutation from 'functions/users/user.mutations'
import * as Query from 'functions/users/user.queries'
import { IUser } from 'models/User'

export default {
  Query,
  Mutation,
  User: {
    checker: async ({ checkerId }: IUser) => {
      const checker = await findChecker({ input: { id: checkerId } })
      return checker
    },
  },
}
