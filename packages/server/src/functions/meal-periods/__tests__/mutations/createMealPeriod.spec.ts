import { gql } from 'apollo-server'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import MealPeriodModel from 'models/MealPeriod'
import UserModel from 'models/User'

const CREATE_MEAL_PERIOD = gql`
  mutation CreateMealPeriod($input: CreateMealPeriodInput!) {
    createMealPeriod(input: $input) {
      id
      _id: id
      name
      registrationStartsAt
      registrationEndsAt
      createdAt
      updatedAt
      createdByUserId
      createdByUser {
        id
        name
      }
    }
  }
`

describe('Test createMealPeriod mutation', () => {
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
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
          registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
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
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
          registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
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
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
          registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
        },
      },
    })

    expect(errors![0].message).toEqual('permission_denied')
  })

  it('should throw error if registrationStartsAt is not specified', async () => {
    expect.assertions(1)

    const { errors } = await mutate({
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
        },
      },
    })

    expect(errors![0].message).toEqual('Ngày mở đăng ký không được để trống')
  })

  it('should throw error if registrationEndsAt is not specified', async () => {
    expect.assertions(1)

    const { errors } = await mutate({
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
        },
      },
    })

    expect(errors![0].message).toEqual('Ngày đóng đăng ký không được để trống')
  })

  it('should throw error if registrationStartsAt is greater than registrationEndsAt', async () => {
    expect.assertions(1)

    const { errors } = await mutate({
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
          registrationEndsAt: new Date('2019-09-02T06:54:43.349Z'),
        },
      },
    })

    expect(errors![0].message).toEqual(
      'Ngày mở đăng ký phải trước ngày đóng đăng ký (02/09/2019)',
    )
  })

  it('createdMealPeriod should return correctly', async () => {
    expect.assertions(1)

    const expectedMealPeriod = {
      id: '5d74b535792ead50349f2f17',
      _id: '5d74b535792ead50349f2f17',
      createdAt: new Date('2019-09-08T08:00:53.155Z'),
      updatedAt: new Date('2019-09-08T08:00:53.155Z'),
      createdByUserId: user.id,
      name: '',
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    }

    mockingoose(UserModel).toReturn(user, 'findOne')
    mockingoose(MealPeriodModel).toReturn(expectedMealPeriod, 'save')

    const { data } = await mutate({
      mutation: CREATE_MEAL_PERIOD,
      variables: {
        input: {
          registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
          registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
        },
      },
    })

    expect(data.createMealPeriod).toMatchObject({
      ...expectedMealPeriod,
      createdByUser: {
        id: user.id,
        name: user.name,
      },
    })
  })
})
