import * as Mutation from 'functions/users/user.mutations'
import * as Query from 'functions/users/user.queries'
import UserModel from 'models/User'

export default {
  Query,
  Mutation,
  User: {
    createdByUser: async ({ createdByUserId }) => {
      const createdByUser = await UserModel.findById(createdByUserId).exec()

      return createdByUser
    },
  },
}
