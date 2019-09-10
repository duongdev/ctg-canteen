import { createMeal as createMealService } from 'functions/meals/meal.services'
import { CreateMealMutationInput } from 'functions/meals/meal.types'
import { createResolver } from 'helpers/resolvers'

export const createMeal = createResolver({
  use: {
    isUser: true,
    hasRole: 'admin',
  },
  resolve: async (
    _parent,
    { input }: { input: CreateMealMutationInput },
    { user },
  ) => {
    const createdMeal = await createMealService({
      ...input,
      createdByUserId: user!.id,
    })

    return createdMeal
  },
})
