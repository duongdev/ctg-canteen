import { getMealPeriod } from 'functions/meal-periods/meal-period.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import MealPeriodModel from 'models/MealPeriod'

describe('Test getMealPeriod service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if mealPeriodId is not specified', async () => {
    expect.assertions(1)

    try {
      await getMealPeriod({} as any)
    } catch (error) {
      expect(error.message).toEqual('Mã buổi ăn không được để trống')
    }
  })

  it('should throw error if mealPeriodId is not a string', async () => {
    expect.assertions(1)

    try {
      await getMealPeriod({ mealPeriodId: {} } as any)
    } catch (error) {
      expect(error.message).toContain('mealPeriodId must be a `string` type')
    }
  })

  it('mealPeriod should return correctly', async () => {
    expect.assertions(1)

    const id = getObjectId()

    const expectedMealPeriod = {
      id: id.toHexString(),
      _id: id,
      createdAt: new Date('2019-09-08T06:29:14.087Z'),
      updatedAt: new Date('2019-09-08T06:29:14.087Z'),
      name: '',
      createdByUserId: getObjectId(),
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    }

    mockingoose(MealPeriodModel).toReturn(expectedMealPeriod, 'findOne')

    const mealPeriod = await getMealPeriod({
      mealPeriodId: id.toHexString(),
    } as any)

    expect(mealPeriod).toMatchObject(expectedMealPeriod)
  })
})
