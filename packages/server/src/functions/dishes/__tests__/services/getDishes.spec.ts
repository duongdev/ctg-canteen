import { getDishes } from 'functions/dishes/dish.services'
import { mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import DishModel from 'models/Dish'

describe('Test getDishes service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if limit is 0', async () => {
    expect.assertions(1)

    try {
      await getDishes({ limit: 0 })
    } catch (error) {
      expect(error.message).toEqual('limit phải là số nguyên dương')
    }
  })

  it('should throw error if limit is not positive integer number', async () => {
    expect.assertions(1)

    try {
      await getDishes({ limit: -1 })
    } catch (error) {
      expect(error.message).toEqual('limit phải là số nguyên dương')
    }
  })

  it('should throw error if page is 0', async () => {
    expect.assertions(1)

    try {
      await getDishes({ page: 0 })
    } catch (error) {
      expect(error.message).toEqual('page phải là số nguyên dương')
    }
  })

  it('should throw error if page is not positive integer number', async () => {
    expect.assertions(1)

    try {
      await getDishes({ page: -1 })
    } catch (error) {
      expect(error.message).toEqual('page phải là số nguyên dương')
    }
  })

  it('should throw error if sortBy is incorrect', async () => {
    expect.assertions(1)

    try {
      await getDishes({ sortBy: '_id' } as any)
    } catch (error) {
      expect(error.message).toEqual(
        'sortBy phải là một trong reverse_createdAt, createdAt, price, reverse_price',
      )
    }
  })

  it('should return dishes correctly', async () => {
    expect.assertions(1)

    const dishes = [
      {
        name: 'Cá kho',
        price: 7500,
        createdAt: new Date('2019-08-21T18:35:19.472Z'),
        updatedAt: new Date('2019-08-21T18:35:19.472Z'),
      },
      {
        name: 'Cá chiên',
        price: 8000,
        createdAt: new Date('2019-07-21T18:35:19.472Z'),
        updatedAt: new Date('2019-07-21T18:35:19.472Z'),
      },
    ]

    mockingoose(DishModel).toReturn(2, 'count')
    mockingoose(DishModel).toReturn(dishes, 'find')

    const data = await getDishes({})
    expect(data).toMatchObject({
      total: 2,
      page: 1,
      limit: 10,
      pages: 1,
      edges: dishes,
    })
  })
})
