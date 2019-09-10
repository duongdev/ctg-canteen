import { gql } from 'apollo-server'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import DishModel from 'models/Dish'
import MealModel from 'models/Meal'
import MealPeriodModel from 'models/MealPeriod'
import UserModel from 'models/User'

const CREATE_MEAL = gql`
  mutation CreateMeal($input: CreateMealInput!) {
    createMeal(input: $input) {
      id
      _id: id
      type
      date
      dishIds
      dishes {
        id
        _id: id
        name
        price
        images
        createdAt
        updatedAt
      }
      mealPeriodId
      mealPeriod {
        id
        name
      }
      createdByUserId
      createdByUser {
        _id: id
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

describe('Test createMeal mutation', () => {
  const user = {
    _id: '5d74b684dd544851a7e39a77',
    id: '5d74b684dd544851a7e39a77',
    username: 'admin',
    name: 'Sophia Lyons',
    roles: ['admin'],
  }

  const { mutate } = createTestClient({
    context: () => ({ user }),
  })

  beforeEach(mockingooseResetAll)

  it('should throw error if user is not signed in', async () => {
    expect.assertions(1)

    const { mutate: $mutate } = createTestClient()
    const { errors } = await $mutate({
      mutation: CREATE_MEAL,
      variables: {
        input: {
          mealPeriodId: '5d655ca269064112eabb2cb3',
          type: 'lunch',
          dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
          date: new Date('2019-08-27 16:38:58.141Z'),
        },
      },
    })

    expect(errors![0].message).toEqual('unauthorized')
  })

  it('should throw error if user has "deactivated" in roles', async () => {
    expect.assertions(1)

    const { mutate: $mutate } = createTestClient({
      context: () => ({
        user: {
          ...user,
          roles: ['admin', 'deactivated'],
        },
      }),
    })

    const { errors } = await $mutate({
      mutation: CREATE_MEAL,
      variables: {
        input: {
          mealPeriodId: '5d655ca269064112eabb2cb3',
          type: 'lunch',
          dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
          date: new Date('2019-08-27 16:38:58.141Z'),
        },
      },
    })

    expect(errors![0].message).toEqual('permission_denied')
  })

  it('should throw error if user does not have "admin" in roles', async () => {
    expect.assertions(1)

    const { mutate: $mutate } = createTestClient({
      context: () => ({
        user: {
          ...user,
          roles: ['student'],
        },
      }),
    })

    const { errors } = await $mutate({
      mutation: CREATE_MEAL,
      variables: {
        input: {
          mealPeriodId: '5d655ca269064112eabb2cb3',
          type: 'lunch',
          dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
          date: new Date('2019-08-27 16:38:58.141Z'),
        },
      },
    })

    expect(errors![0].message).toEqual('permission_denied')
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

    const expectedCreatedMeal = {
      _id: '5d74b684dd544851a7e39a22',
      id: '5d74b684dd544851a7e39a22',
      createdByUserId: '5d74b684dd544851a7e39a77',
      createdAt: new Date('2019-09-10T16:48:20.668Z'),
      date: new Date('2019-08-27T16:38:58.141Z'),
      dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
      mealPeriodId: '5d655ca269064112eabb2cb3',
      type: 'lunch',
      updatedAt: new Date('2019-09-10T16:48:20.668Z'),
    }

    mockingoose(DishModel).toReturn(dishes, 'find')
    mockingoose(UserModel).toReturn(user, 'findOne')
    mockingoose(MealPeriodModel).toReturn(mealPeriod, 'findOne')
    mockingoose(MealModel).toReturn(expectedCreatedMeal, 'save')

    const { data } = await mutate({
      mutation: CREATE_MEAL,
      variables: {
        input: {
          mealPeriodId: '5d655ca269064112eabb2cb3',
          type: 'lunch',
          dishIds: ['5d655ca269064112eabb2cb8', '5d655d8b99609c1388e9143c'],
          date: new Date('2019-08-27 16:38:58.141Z'),
        },
      },
    })

    expect(data!.createMeal).toMatchObject({
      ...expectedCreatedMeal,
      dishes,
      createdByUser: {
        id: user.id,
        name: user.name,
      },
      mealPeriod: {
        id: mealPeriod.id,
        name: mealPeriod.name,
      },
    })
  })
})
