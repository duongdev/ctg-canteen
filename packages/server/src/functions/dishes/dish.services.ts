import { CreateDishInput, GetDishesFilter } from 'functions/dishes/dish.types'
import {
  createDishInputValidation,
  getDishesValidation,
} from 'functions/dishes/dish.validations'
import DishModel from 'models/Dish'
import { getSortByFromString } from 'utils/string'

export const createDish = async (dish: CreateDishInput) => {
  await createDishInputValidation.validate(dish)

  const createdDish = await DishModel.create(dish)
  return createdDish
}

export const getDishes = async ({
  sortBy = 'reverse_createdAt',
  limit = 10,
  page = 1,
}: GetDishesFilter) => {
  await getDishesValidation.validate({
    sortBy,
    limit,
    page,
  })

  const $sortBy = getSortByFromString(sortBy)
  const skip = (page - 1) * limit
  const query = {}
  const [users, total] = await Promise.all([
    DishModel.find(query)
      .sort($sortBy)
      .skip(skip)
      .limit(limit)
      .exec(),
    DishModel.count(query).exec(),
  ])

  return {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    edges: users.map((user) => user.toJSON()),
  }
}
