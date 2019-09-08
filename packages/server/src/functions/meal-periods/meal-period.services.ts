import { CreateMealPeriodInput } from 'functions/meal-periods/meal-period.types'
import { createMealPeriodValidation } from 'functions/meal-periods/meal-period.validations'
import MealPeriodModel from 'models/MealPeriod'

export const createMealPeriod = async (data: CreateMealPeriodInput) => {
  const parsedData = createMealPeriodValidation.validateSync(data)

  const createdMealPeriod = await MealPeriodModel.create(parsedData)

  return createdMealPeriod
}
