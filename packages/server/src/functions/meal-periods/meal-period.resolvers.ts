import * as Mutation from 'functions/meal-periods/meal-period.mutations'
import * as Query from 'functions/meal-periods/meal-period.queries'
import { IMealPeriod } from 'models/MealPeriod'
import UserModel from 'models/User'

export default {
  Mutation,
  Query,
  MealPeriod: {
    createdByUser: async ({ createdByUserId }: IMealPeriod) => {
      const user = await UserModel.findById(createdByUserId).exec()
      return user
    },
  },
}
