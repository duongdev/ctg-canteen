import { gql } from 'apollo-server'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import DishModel from 'models/Dish'

const DISHES = gql`
  query Dish($input: DishesInput) {
    dishes(input: $input) {
      total
      page
      pages
      limit
      edges {
        name
        images
        price
        createdAt
        updatedAt
      }
    }
  }
`

describe('Test dishes query', () => {
  const user = {
    id: '5ce97bd9e37a4dbf663aeed3',
    username: 'ID1',
    name: 'Nguyễn Văn A',
    group: 'boarding',
    boardingRoom: 'A-Class',
    class: 'A-Class',
    roles: ['admin'],
    checkerId: '0901000239112',
  }

  const { query } = createTestClient({
    context: () => ({ user }),
  })

  beforeEach(mockingooseResetAll)

  it('should throw error if user is not sign in', async () => {
    expect.assertions(1)

    const { query: $query } = createTestClient()
    const { errors } = await $query({ query: DISHES })

    expect(errors![0].message).toEqual('unauthorized')
  })

  it('should throw error if user roles is include "deactivated"', async () => {
    expect.assertions(1)

    const { query: $query } = createTestClient({
      context: () => ({ user: { ...user, roles: ['admin', 'deactivated'] } }),
    })
    const { errors } = await $query({ query: DISHES })

    expect(errors![0].message).toEqual('permission_denied')
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

    const { data } = await query({
      query: DISHES,
      variables: {
        input: {
          name: 'ca',
        },
      },
    })

    expect(data.dishes).toMatchObject({
      total: 2,
      page: 1,
      limit: 10,
      pages: 1,
      edges: dishes,
    })
  })
})
