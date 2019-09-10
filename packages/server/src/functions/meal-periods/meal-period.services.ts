import {
  CreateMealPeriodInput,
  GetMealPeriodInput,
  GetMealPeriodsInput,
} from 'functions/meal-periods/meal-period.types'
import {
  createMealPeriodValidation,
  getMealPeriodInputValidation,
  getMealPeriodsInputValidation,
} from 'functions/meal-periods/meal-period.validations'
import { isEmpty } from 'lodash'
import MealPeriodModel from 'models/MealPeriod'
import { getSortByFromString } from 'utils/string'

export const createMealPeriod = async (data: CreateMealPeriodInput) => {
  const parsedData = createMealPeriodValidation.validateSync(data)

  const createdMealPeriod = await MealPeriodModel.create(parsedData)

  return createdMealPeriod
}

export const getMealPeriods = async ({
  search,
  registrationStartUntil,
  registrationStartSince,
  registrationEndUntil,
  registrationEndSince,
  orderBy = 'reverse_registrationEndsAt',
  offset = 0,
  limit = 10,
}: GetMealPeriodsInput = {}) => {
  getMealPeriodsInputValidation.validateSync({
    search,
    registrationStartUntil,
    registrationStartSince,
    registrationEndUntil,
    registrationEndSince,
    orderBy,
    offset,
    limit,
  })

  const filter: {
    name?: { $regex?: string; $options?: string }
    registrationStartsAt?: { $gte?: Date; $lt?: Date }
    registrationEndsAt?: { $gte?: Date; $lt?: Date }
  } = {}
  const sortBy = getSortByFromString(orderBy)

  if (!isEmpty(search)) {
    filter.name = { $regex: search, $options: 'i' }
  }

  if (!registrationStartSince) {
    if (!filter.registrationStartsAt) {
      filter.registrationStartsAt = {}
    }

    filter.registrationStartsAt.$gte = registrationStartSince
  }

  if (!registrationStartUntil) {
    if (!filter.registrationStartsAt) {
      filter.registrationStartsAt = {}
    }

    filter.registrationStartsAt.$lt = registrationStartUntil
  }

  if (!registrationEndSince) {
    if (!filter.registrationEndsAt) {
      filter.registrationEndsAt = {}
    }

    filter.registrationEndsAt.$gte = registrationEndSince
  }

  if (!registrationEndUntil) {
    if (!filter.registrationEndsAt) {
      filter.registrationEndsAt = {}
    }

    filter.registrationEndsAt.$lt = registrationEndUntil
  }

  const [mealPeriods, total] = await Promise.all([
    MealPeriodModel.find(filter)
      .sort(sortBy)
      .skip(offset)
      .limit(limit)
      .exec(),
    MealPeriodModel.count(filter).exec(),
  ])

  return {
    total,
    offset,
    limit,
    mealPeriods: mealPeriods.map((mealPeriod) => mealPeriod.toJSON()),
  }
}

export const getMealPeriod = async ({ mealPeriodId }: GetMealPeriodInput) => {
  getMealPeriodInputValidation.validateSync({ mealPeriodId })

  const mealPeriod = await MealPeriodModel.findById(mealPeriodId).exec()

  return mealPeriod.toJSON()
}
