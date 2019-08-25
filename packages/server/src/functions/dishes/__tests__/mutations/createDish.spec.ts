import { gql } from 'apollo-server'
import { createTestClient } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import DishModel from 'models/Dish'

const CREATE_DISH = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      id
      _id: id
      name
      images
      price
    }
  }
`

describe('Test createDish mutation', () => {
  const user = {
    _id: '5d5584e295aa9906a4beb0ad',
    id: '5d5584e295aa9906a4beb0ad',
    username: 'admin',
    name: 'Sophia Lyons',
    roles: ['admin'],
  }

  const { mutate } = createTestClient({
    context: () => ({ user }),
  })

  it('should throw error if user is not sign in', async () => {
    expect.assertions(1)
    const { mutate: $mutate } = createTestClient()

    const { errors } = await $mutate({
      mutation: CREATE_DISH,
      variables: {
        input: {
          name: 'Cá kho tộ',
          price: 7500,
        },
      },
    })

    expect(errors![0].message).toEqual('unauthorized')
  })

  it('should throw error if user does not have "admin" role', async () => {
    expect.assertions(1)
    const { mutate: $mutate } = createTestClient({
      context: () => ({ user: { ...user, roles: ['other'] } }),
    })

    const { errors } = await $mutate({
      mutation: CREATE_DISH,
      variables: {
        input: {
          name: 'Cá kho tộ',
          price: 7500,
        },
      },
    })

    expect(errors![0].message).toEqual('permission_denied')
  })

  it('should throw error if user has "deactivated"', async () => {
    expect.assertions(1)
    const { mutate: $mutate } = createTestClient({
      context: () => ({ user: { ...user, roles: ['admin', 'deactivated'] } }),
    })

    const { errors } = await $mutate({
      mutation: CREATE_DISH,
      variables: {
        input: {
          name: 'Cá kho tộ',
          price: 7500,
        },
      },
    })

    expect(errors![0].message).toEqual('permission_denied')
  })

  it('createdDish should return correctly', async () => {
    expect.assertions(1)
    const dish = {
      _id: '5d55b991920aa7f8513907aa',
      id: '5d55b991920aa7f8513907aa',
      name: 'Cá kho',
      images: ['cakho_1.jpg'],
      price: 7500,
    }

    mockingoose(DishModel).toReturn(dish, 'save')

    const { data } = await mutate({
      mutation: CREATE_DISH,
      variables: {
        input: {
          name: 'Cá kho tộ',
          images: ['cakho_1.jpg'],
          price: 7500,
        },
      },
    })

    expect(data.createDish).toMatchObject(dish)
  })
})
