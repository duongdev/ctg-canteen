import { getMealPeriods } from 'functions/meal-periods/meal-period.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import MealPeriodModel from 'models/MealPeriod'

describe('Test getMealPeriods service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if search is not a string', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        search: {},
      } as any)
    } catch (error) {
      expect(error.message).toContain('search must be a `string` type')
    }
  })

  it('should throw error if registrationStartSince is not a date', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        registrationStartSince: '20/09/2019',
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'registrationStartSince must be a `date` type',
      )
    }
  })

  it('should throw error if registrationStartUntil is not a date', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        registrationStartUntil: '20/09/2019',
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'registrationStartUntil must be a `date` type',
      )
    }
  })

  it('should throw error if registrationStartSince greater than registrationStartUntil', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        registrationStartSince: new Date('2019-10-08T07:08:43.549Z'),
        registrationStartUntil: new Date('2019-09-08T07:08:43.549Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Ngày mở đăng ký bắt đầu phải trước ngày mở đăng ký kết thúc (08/09/2019)',
      )
    }
  })

  it('should throw error if registrationEndSince is not a date', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        registrationEndSince: '20/09/2019',
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'registrationEndSince must be a `date` type',
      )
    }
  })

  it('should throw error if registrationEndUntil is not a date', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        registrationEndUntil: '20/09/2019',
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'registrationEndUntil must be a `date` type',
      )
    }
  })

  it('should throw error if registrationEndSince greater than registrationEndUntil', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        registrationEndSince: new Date('2019-10-08T07:08:43.549Z'),
        registrationEndUntil: new Date('2019-09-08T07:08:43.549Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Ngày đóng đăng ký bắt đầu phải trước ngày đóng đăng ký kết thúc (08/09/2019)',
      )
    }
  })

  it('should throw error if offset is not a number', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        offset: {},
      } as any)
    } catch (error) {
      expect(error.message).toContain('offset must be a `number` type')
    }
  })

  it('should throw error if offset is a negative number', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        offset: -1,
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Số lượng bỏ qua phải là một số nguyên lớn hơn hoặc bằng 0',
      )
    }
  })

  it('should throw error if limit is not a number', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        limit: {},
      } as any)
    } catch (error) {
      expect(error.message).toContain('limit must be a `number` type')
    }
  })

  it('should throw error if limit is 0', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        limit: 0,
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Giới hạn số lượng phải là số nguyên dương',
      )
    }
  })

  it('should throw error if limit is a negative number', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        limit: -1,
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Giới hạn số lượng phải là số nguyên dương',
      )
    }
  })

  it('should throw error if orderBy is not a string', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        orderBy: 0,
      } as any)
    } catch (error) {
      expect(error.message).toContain('orderBy must be a `string` type')
    }
  })

  it('should throw error if orderBy is not one of registrationStartsAt, reverse_registrationStartsAt, registrationEndsAt, reverse_registrationEndsAt', async () => {
    expect.assertions(1)

    try {
      await getMealPeriods({
        orderBy: 'createdAt',
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Thứ tự sắp xếp phải là một trong các thứ tự sau registrationStartsAt, reverse_registrationStartsAt, registrationEndsAt, reverse_registrationEndsAt',
      )
    }
  })

  it('should return correctly with pagination', async () => {
    expect.assertions(1)

    const id = getObjectId()

    const mealPeriods = [
      {
        id: id.toHexString(),
        _id: id,
        createdAt: new Date('2019-09-08T06:29:14.087Z'),
        updatedAt: new Date('2019-09-08T06:29:14.087Z'),
        name: '',
        createdByUserId: getObjectId(),
        registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
        registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
      },
    ]

    mockingoose(MealPeriodModel).toReturn(mealPeriods, 'find')
    mockingoose(MealPeriodModel).toReturn(1, 'count')

    const data = await getMealPeriods()

    expect(data).toMatchObject({
      mealPeriods,
      total: 1,
      offset: 0,
      limit: 10,
    })
  })
})
