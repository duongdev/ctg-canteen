import { getDishes } from 'functions/dishes/dish.services'
import { GetDishesFilter, GetDishesOutput } from 'functions/dishes/dish.types'
import { createResolver } from 'helpers/resolvers'

export const dishes = createResolver<
  GetDishesOutput,
  { input: GetDishesFilter }
>({
  use: {
    notDeactivate: true,
  },
  resolve: async (_parent, { input }) => {
    const dishes = await getDishes(input)

    return dishes
  },
})
