import { createMealPeriod } from 'functions/meal-periods/meal-period.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import MealPeriodModel from 'models/MealPeriod'

describe('Test createMealPeriod service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if createdByUserId is not specified', async () => {
    expect.assertions(1)

    try {
      await createMealPeriod({
        registrationEndsAt: new Date('2019-10-20T06:54:43.349Z'),
        registrationStartsAt: new Date('2019-10-02T06:54:43.349Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Mã người tạo không được để trống')
    }
  })

  it('should throw error if registrationStartsAt is not specified', async () => {
    expect.assertions(1)

    try {
      await createMealPeriod({
        createdByUserId: '5d655ca269064112eabb2cb8',
        registrationEndsAt: new Date('2019-10-02T06:54:43.349Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Ngày mở đăng ký không được để trống')
    }
  })

  it('should throw error if registrationEndsAt is not specified', async () => {
    expect.assertions(1)

    try {
      await createMealPeriod({
        createdByUserId: '5d655ca269064112eabb2cb8',
        registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Ngày đóng đăng ký không được để trống')
    }
  })

  it('should throw error if registrationStartsAt is greater than registrationEndsAt', async () => {
    expect.assertions(1)

    try {
      await createMealPeriod({
        createdByUserId: '5d655ca269064112eabb2cb8',
        registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
        registrationEndsAt: new Date('2019-09-02T06:54:43.349Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual(
        'Ngày mở đăng ký phải trước ngày đóng đăng ký (02/09/2019)',
      )
    }
  })

  it('createdMealPeriod should return correctly', async () => {
    expect.assertions(4)

    const createdByUserId = getObjectId('5d655ca269064112eabb2cb8')

    const expectedMealPeriod = {
      id: '5d749fbab975fa40a309ad4a',
      _id: '5d749fbab975fa40a309ad4a',
      createdAt: '2019-09-08T06:29:14.087Z',
      updatedAt: '2019-09-08T06:29:14.087Z',
      name: '',
      createdByUserId: '5d655ca269064112eabb2cb8',
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    }

    mockingoose(MealPeriodModel).toReturn(expectedMealPeriod, 'save')

    const createdMealPeriod = await createMealPeriod({
      createdByUserId: '5d655ca269064112eabb2cb8',
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    } as any)

    expect(createdMealPeriod.name).toEqual('')
    expect(createdMealPeriod.createdByUserId).toEqual(createdByUserId)
    expect(createdMealPeriod.registrationEndsAt).toEqual(
      new Date('2019-10-01T06:54:43.349Z'),
    )
    expect(createdMealPeriod.registrationStartsAt).toEqual(
      new Date('2019-09-02T06:54:43.349Z'),
    )
  })
})
