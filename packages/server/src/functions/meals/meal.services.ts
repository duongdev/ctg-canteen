import { CreateMealInput } from 'functions/meals/meal.types'
import { createMealInputValidation } from 'functions/meals/meal.validations'
import { isEmpty } from 'lodash'
import DishModel from 'models/Dish'
import MealModel from 'models/Meal'
import MealPeriodModel from 'models/MealPeriod'

export const createMeal = async (data: CreateMealInput) => {
  const parsedData = createMealInputValidation.validateSync(data)

  const mealPeriod = await MealPeriodModel.findById(
    parsedData.mealPeriodId,
  ).exec()

  if (!mealPeriod) {
    throw new Error('Đợt ăn không tồn tại')
  }

  const dishes = await DishModel.find({
    _id: { $in: parsedData.dishIds },
  })

  if (isEmpty(dishes)) {
    throw new Error(
      `Không thể tìm thấy các món ăn ${parsedData.dishIds.join(
        ', ',
      )} trong dữ liệu`,
    )
  }

  const createdMeal = await MealModel.create(parsedData)

  return createdMeal.toJSON()
}
