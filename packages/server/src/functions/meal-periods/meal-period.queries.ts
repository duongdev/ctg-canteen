import { getMealPeriods } from 'functions/meal-periods/meal-period.services'
import { GetMealPeriodsInput } from 'functions/meal-periods/meal-period.types'
import { createResolver } from 'helpers/resolvers'

export const mealPeriods = createResolver({
  resolve: async (_parent, { filter }: { filter: GetMealPeriodsInput }) => {
    const data = await getMealPeriods(filter)
    return data
  },
})
