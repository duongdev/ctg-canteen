import { createMeal } from 'functions/meals/meal.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import DishModel from 'models/Dish'
import MealModel from 'models/Meal'
import MealPeriodModel from 'models/MealPeriod'

describe('Test createMeal action', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if createdByUserId is not specified', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        mealPeriodId: '5d655ca269064112eabb2c12',
        type: 'lunch',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Mã người tạo không được để trống')
    }
  })

  it('should throw error if mealPeriodId is not specified', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        type: 'lunch',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Mã đợt ăn không được để trống')
    }
  })

  it('should throw error if meal period could not find by mealPeriodId', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'lunch',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Đợt ăn không tồn tại')
    }
  })

  it('should throw error if type is not specified', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Buổi ăn không được để trống')
    }
  })

  it('should throw error if type is not a string', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: {},
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain('type must be a `string` type')
    }
  })

  it('should throw error if type is not one of breakfast, lunch, dinner', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'afternoon',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Buổi ăn phải là một trong các buổi sau breakfast, lunch, dinner',
      )
    }
  })

  it('should throw error if dishIds is not specified', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'afternoon',
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain('Danh sách mã món ăn không được để trống')
    }
  })

  it('should throw error if dishIds is empty', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'afternoon',
        dishIds: [],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain('Phải có ít nhất một món ăn')
    }
  })

  it('should throw error if dishes could not find by dishIds', async () => {
    expect.assertions(1)

    const mealPeriod = {
      id: '5d74b535792ead50349f2f17',
      _id: '5d74b535792ead50349f2f17',
      createdAt: new Date('2019-09-08T08:00:53.155Z'),
      updatedAt: new Date('2019-09-08T08:00:53.155Z'),
      createdByUserId: '5d74b535792ead50349f2f10',
      name: '',
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    }

    mockingoose(MealPeriodModel).toReturn(mealPeriod, 'findOne')

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'afternoon',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: new Date('2019-08-27 16:38:58.141Z'),
      } as any)
    } catch (error) {
      expect(error.message).toContain(
        'Buổi ăn phải là một trong các buổi sau breakfast, lunch, dinner',
      )
    }
  })

  it('should throw error if date is not specified', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'lunch',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
      } as any)
    } catch (error) {
      expect(error.message).toContain('Ngày ăn không được để trống')
    }
  })

  it('should throw error if date is not a date', async () => {
    expect.assertions(1)

    try {
      await createMeal({
        createdByUserId: '5d655ca269064112eabb2c12',
        mealPeriodId: '5d655ca269064112eabb2cb3',
        type: 'afternoon',
        dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
        date: 0,
      } as any)
    } catch (error) {
      expect(error.message).toContain('date must be a `date` type')
    }
  })

  it('createdMeal should return correctly', async () => {
    expect.assertions(1)

    const mealPeriod = {
      id: '5d74b535792ead50349f2f17',
      _id: '5d74b535792ead50349f2f17',
      createdAt: new Date('2019-09-08T08:00:53.155Z'),
      updatedAt: new Date('2019-09-08T08:00:53.155Z'),
      createdByUserId: '5d74b535792ead50349f2f10',
      name: '',
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    }

    const dishes = [
      {
        id: '5d655ca269064112eabb2cb8',
        _id: '5d655ca269064112eabb2cb8',
        name: 'Cá kho tộ',
        price: 8000,
        images: [
          '/Users/nguyenthanh/Projects/ctg-canteen/packages/server/public/59211367_2382879528615459_4563482715701116928_o.jpg',
        ],
        createdAt: new Date('2019-08-27T16:38:58.141Z'),
        updatedAt: new Date('2019-08-27T16:38:58.141Z'),
      },
      {
        id: '5d655d8b99609c1388e9143c',
        _id: '5d655d8b99609c1388e9143c',
        name: 'Cá kho tộ',
        price: 8000,
        images: [
          '/Users/nguyenthanh/Projects/ctg-canteen/packages/server/public/59211367_2382879528615459_4563482715701116928_o.jpg',
        ],
        createdAt: new Date('2019-08-27T16:42:51.435Z'),
        updatedAt: new Date('2019-08-27T16:42:51.435Z'),
      },
    ]

    const id = getObjectId()

    const expectedCreatedMeal = {
      _id: id,
      id: id.toHexString(),
      createdByUserId: getObjectId('5d655ca269064112eabb2c12'),
      createdAt: new Date('2019-09-10T16:48:20.668Z'),
      date: new Date('2019-08-27T16:38:58.141Z'),
      dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
      mealPeriodId: getObjectId('5d655ca269064112eabb2cb3'),
      type: 'lunch',
      updatedAt: new Date('2019-09-10T16:48:20.668Z'),
    }

    mockingoose(DishModel).toReturn(dishes, 'find')
    mockingoose(MealPeriodModel).toReturn(mealPeriod, 'findOne')
    mockingoose(MealModel).toReturn(expectedCreatedMeal, 'save')

    const createdMeal = await createMeal({
      createdByUserId: '5d655ca269064112eabb2c12',
      mealPeriodId: '5d655ca269064112eabb2cb3',
      type: 'lunch',
      dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
      date: new Date('2019-08-27 16:38:58.141Z'),
    } as any)

    expect(createdMeal).toMatchObject(expectedCreatedMeal)
  })
})
