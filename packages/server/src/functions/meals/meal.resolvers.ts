import * as Mutation from 'functions/meals/meal.mutations'
import DishModel from 'models/Dish'
import { IMeal } from 'models/Meal'
import MealPeriodModel from 'models/MealPeriod'
import UserModel from 'models/User'

export default {
  Mutation,
  Meal: {
    dishes: async ({ dishIds }: IMeal) => {
      const dishes = await DishModel.find({
        _id: { $in: dishIds },
      }).exec()

      return dishes
    },
    mealPeriod: async ({ mealPeriodId }: IMeal) => {
      const mealPeriod = await MealPeriodModel.findById(mealPeriodId).exec()

      return mealPeriod
    },
    createdByUser: async ({ createdByUserId }: IMeal) => {
      const user = await UserModel.findById(createdByUserId).exec()

      return user
    },
  },
}
