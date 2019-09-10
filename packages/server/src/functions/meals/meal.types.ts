import { MEAL_TYPES } from 'models/Meal'

export type CreateMealInput = {
  createdByUserId: string
  mealPeriodId: string
  type: typeof MEAL_TYPES[number]
  dishIds: string[]
  date: Date
}

export type CreateMealMutationInput = {
  mealPeriodId: string
  type: typeof MEAL_TYPES[number]
  dishIds: string[]
  date: Date
}
