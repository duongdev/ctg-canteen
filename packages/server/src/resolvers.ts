import { merge } from 'lodash'

import dishResolvers from 'functions/dishes/dish.resolvers'
import mealPeriodResolvers from 'functions/meal-periods/meal-period.resolvers'
import mealResolvers from 'functions/meals/meal.resolvers'
import userResolvers from 'functions/users/user.resolvers'

export default merge(
  {
    Query: {
      _empty: () => 'Hello world!',
    },
  },
  dishResolvers,
  mealPeriodResolvers,
  mealResolvers,
  userResolvers,
)
