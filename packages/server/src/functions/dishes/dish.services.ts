import { CreateDishInput } from 'functions/dishes/dish.types'
import { createDishInputValidation } from 'functions/dishes/dish.validations'
import DishModel from 'models/Dish'

export const createDish = async (dish: CreateDishInput) => {
  await createDishInputValidation.validate(dish)

  const createdDish = await DishModel.create(dish)
  return createdDish
}
