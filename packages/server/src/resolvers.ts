import { merge } from 'lodash'

import mealPeriodResolvers from 'functions/meal-periods/meal-period.resolvers'
import userResolvers from 'functions/users/user.resolvers'

export default merge(
  {
    Query: {
      _empty: () => 'Hello world!',
    },
  },
  mealPeriodResolvers,
  userResolvers,
)
