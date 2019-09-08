import { tuple } from 'utils/tuple'

export type CreateMealPeriodInput = {
  name?: string
  registrationStartsAt: Date
  registrationEndsAt: Date
  createdByUserId: string
}

export const MEAL_PERIOD_ORDER_BY = tuple([
  'registrationStartsAt',
  'reverse_registrationStartsAt',
  'registrationEndsAt',
  'reverse_registrationEndsAt',
])

export type GetMealPeriodsInput = {
  search?: string
  registrationStartSince?: Date
  registrationStartUntil?: Date
  registrationEndSince?: Date
  registrationEndUntil?: Date
  offset?: number
  limit?: number
  orderBy?: typeof MEAL_PERIOD_ORDER_BY[number]
}

export type GetMealPeriodInput = {
  mealPeriodId: string
}
