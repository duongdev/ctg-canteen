import { gql } from 'apollo-server'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import MealPeriodModel from 'models/MealPeriod'

const MEAL_PERIODS = gql`
  query MealPeriods($filter: MealPeriodsFilter) {
    mealPeriods(filter: $filter) {
      total
      offset
      limit
      mealPeriods {
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
  }
`

describe('Test mealPeriods query', () => {
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

  it('should throw error if search is not a string', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          search: {},
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$filter" got invalid value {} at "filter.search"; Expected type String',
    )
  })

  it('should throw error if registrationStartSince is not a date', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          registrationStartSince: '20/09/2019',
        },
      },
    })

    expect(errors![0].message).toContain(
      'registrationStartSince must be a `date` type',
    )
  })

  it('should throw error if registrationStartUntil is not a date', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          registrationStartUntil: '20/09/2019',
        },
      },
    })

    expect(errors![0].message).toContain(
      'registrationStartUntil must be a `date` type',
    )
  })

  it('should throw error if registrationStartSince greater than registrationStartUntil', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          registrationStartSince: new Date('2019-10-08T07:08:43.549Z'),
          registrationStartUntil: new Date('2019-09-08T07:08:43.549Z'),
        },
      },
    })

    expect(errors![0].message).toContain(
      'Ngày mở đăng ký bắt đầu phải trước ngày mở đăng ký kết thúc (08/09/2019)',
    )
  })

  it('should throw error if registrationEndSince is not a date', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          registrationEndSince: '20/09/2019',
        },
      },
    })

    expect(errors![0].message).toContain(
      'registrationEndSince must be a `date` type',
    )
  })

  it('should throw error if registrationEndUntil is not a date', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          registrationEndUntil: '20/09/2019',
        },
      },
    })

    expect(errors![0].message).toContain(
      'registrationEndUntil must be a `date` type',
    )
  })

  it('should throw error if registrationEndSince greater than registrationEndUntil', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          registrationEndSince: new Date('2019-10-08T07:08:43.549Z'),
          registrationEndUntil: new Date('2019-09-08T07:08:43.549Z'),
        },
      },
    })

    expect(errors![0].message).toContain(
      'Ngày đóng đăng ký bắt đầu phải trước ngày đóng đăng ký kết thúc (08/09/2019)',
    )
  })

  it('should throw error if offset is not a number', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          offset: {},
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$filter" got invalid value {} at "filter.offset"; Expected type Int',
    )
  })

  it('should throw error if offset is a negative number', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          offset: -1,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Số lượng bỏ qua phải là một số nguyên lớn hơn hoặc bằng 0',
    )
  })

  it('should throw error if limit is not a number', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          limit: {},
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$filter" got invalid value {} at "filter.limit"; Expected type Int',
    )
  })

  it('should throw error if limit is 0', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          limit: 0,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Giới hạn số lượng phải là số nguyên dương',
    )
  })

  it('should throw error if limit is a negative number', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          limit: -1,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Giới hạn số lượng phải là số nguyên dương',
    )
  })

  it('should throw error if orderBy is not a string', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          orderBy: 0,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$filter" got invalid value 0 at "filter.orderBy"; Expected type String',
    )
  })

  it('should throw error if orderBy is not one of registrationStartsAt, reverse_registrationStartsAt, registrationEndsAt, reverse_registrationEndsAt', async () => {
    expect.assertions(1)

    const { errors } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          orderBy: 'createdAt',
        },
      },
    })

    expect(errors![0].message).toContain(
      'Thứ tự sắp xếp phải là một trong các thứ tự sau registrationStartsAt, reverse_registrationStartsAt, registrationEndsAt, reverse_registrationEndsAt',
    )
  })

  it('should return correctly with pagination', async () => {
    expect.assertions(1)

    const mealPeriods = [
      {
        id: '5d74badbc4f06455c1ca8ded',
        _id: '5d74badbc4f06455c1ca8ded',
        createdAt: new Date('2019-09-08T06:29:14.087Z'),
        updatedAt: new Date('2019-09-08T06:29:14.087Z'),
        name: '',
        createdByUserId: '5d74badbc4f06455c1ca8dee',
        registrationStartsAt: new Date('2019-09-02T06:54:43.349Z'),
        registrationEndsAt: new Date('2019-09-31T06:54:43.349Z'),
      },
    ]

    mockingoose(MealPeriodModel).toReturn(mealPeriods, 'find')
    mockingoose(MealPeriodModel).toReturn(1, 'count')

    const { data } = await query({
      query: MEAL_PERIODS,
      variables: {
        filter: {
          orderBy: 'reverse_registrationStartsAt',
        },
      },
    })

    expect(data.mealPeriods).toMatchObject({
      mealPeriods,
      total: 1,
      offset: 0,
      limit: 10,
    })
  })
})
