import { createDish as createDishService } from 'functions/dishes/dish.services'
import { CreateDishInput } from 'functions/dishes/dish.types'
import { createResolver } from 'helpers/resolvers'

// TODO: implement upload image multiple
export const createDish = createResolver({
  use: {
    hasRole: 'admin',
  },
  resolve: async (_parent, { input }: { input: CreateDishInput }) => {
    const createdDish = await createDishService(input)
    return createdDish
  },
})
