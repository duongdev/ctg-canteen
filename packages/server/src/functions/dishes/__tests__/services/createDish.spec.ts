import { createDish } from 'functions/dishes/dish.services'
import { mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import DishModel from 'models/Dish'

describe('Test createDish service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if name is not specified', async () => {
    expect.assertions(1)
    try {
      await createDish({ price: 1 } as any)
    } catch (error) {
      expect(error.message).toEqual('Tên món ăn không được để trống')
    }
  })

  it('should throw error if price is not a specified', async () => {
    expect.assertions(1)
    try {
      await createDish({ name: 'Cá kho', images: ['cakho_1.jpg'] } as any)
    } catch (error) {
      expect(error.message).toEqual('Giá món ăn không được để trống')
    }
  })

  it('should throw error if price is not a integer number', async () => {
    expect.assertions(1)
    try {
      await createDish({
        name: 'Cá kho',
        images: ['cakho_1.jpg'],
        price: 1.1,
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Giá món ăn phải là một số nguyên')
    }
  })

  it('should throw error if price is not a positive integer number', async () => {
    expect.assertions(1)
    try {
      await createDish({
        name: 'Cá kho',
        images: ['cakho_1.jpg'],
        price: -1,
      } as any)
    } catch (error) {
      expect(error.message).toEqual('Giá món ăn phải lớn hơn hoặc bằng 0')
    }
  })

  it('createdDish should return correctly', async () => {
    expect.assertions(1)
    const dish = {
      name: 'Cá kho',
      images: ['cakho_1.jpg'],
      price: 7500,
    }

    mockingoose(DishModel).toReturn(dish, 'save')

    const createdDish = await createDish({
      name: 'Cá kho',
      images: ['cakho_1.jpg'],
      price: 7500,
    } as any)

    expect(createdDish).toMatchObject(dish)
  })
})
