import { gql } from 'apollo-server'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import MealPeriodModel from 'models/MealPeriod'

const MEAL_PERIOD = gql`
  query MealPeriod($id: String!) {
    mealPeriod(id: $id) {
      id
      _id: id
      name
      registrationStartsAt
      registrationEndsAt
      createdAt
      updatedAt
      createdByUserId
    }
  }
`

describe('Test mealPeriod query', () => {
  const user = {
    _id: '5d74b684dd544851a7e39a77',
    id: '5d74b684dd544851a7e39a77',
    username: 'admin',
    name: 'Sophia Lyons',
    roles: ['admin'],
  }

  const { query } = createTestClient({
    context: () => ({ user }),
  })

  beforeEach(mockingooseResetAll)

  it('should throw error if id is not specified', async () => {
    expect.assertions(1)

    const { errors } = await query({ query: MEAL_PERIOD, variables: {} })

    expect(errors![0].message).toEqual(
      'Variable "$id" of required type "String!" was not provided.',
    )
  })

  it('should throw error if id is not a string', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIOD,
      variables: { id: {} },
    })

    expect(errors![0].message).toContain(
      'Variable "$id" got invalid value {}; Expected type String',
    )
  })

  it('mealPeriod should return correctly', async () => {
    expect.assertions(1)

    const expectedMealPeriod = {
      id: '5d77ca880a1fe2730dee4b12',
      _id: '5d77ca880a1fe2730dee4b12',
      createdAt: new Date('2019-09-08T06:29:14.087Z'),
      updatedAt: new Date('2019-09-08T06:29:14.087Z'),
      name: '',
      createdByUserId: '5d77ca880a1fe2730dee4b13',
      registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
      registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
    }

    mockingoose(MealPeriodModel).toReturn(expectedMealPeriod, 'findOne')

    const { data } = await query({
      query: MEAL_PERIOD,
      variables: { id: '5d77ca880a1fe2730dee4b12' },
    })

    expect(data!.mealPeriod).toMatchObject(expectedMealPeriod)
  })
})
