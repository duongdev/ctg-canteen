import { createMealPeriod as createMealPeriodService } from 'functions/meal-periods/meal-period.services'
import { CreateMealPeriodInput } from 'functions/meal-periods/meal-period.types'
import { createResolver } from 'helpers/resolvers'

export const createMealPeriod = createResolver({
  use: {
    isUser: true,
    hasRole: 'admin',
  },
  resolve: async (
    _parent,
    { input }: { input: CreateMealPeriodInput },
    { user },
  ) => {
    const mealPeriod = await createMealPeriodService({
      ...input,
      createdByUserId: user!.id,
    })

    return mealPeriod
  },
})
