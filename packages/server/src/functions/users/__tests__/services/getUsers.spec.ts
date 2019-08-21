import { getUsers } from 'functions/users/user.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

describe('Test getUsers service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw error if limit is 0', async () => {
    expect.assertions(1)

    try {
      await getUsers({ limit: 0 })
    } catch (error) {
      expect(error.message).toEqual('limit phải là số nguyên dương')
    }
  })

  it('should throw error if limit is not positive integer number', async () => {
    expect.assertions(1)

    try {
      await getUsers({ limit: -1 })
    } catch (error) {
      expect(error.message).toEqual('limit phải là số nguyên dương')
    }
  })

  it('should throw error if page is 0', async () => {
    expect.assertions(1)

    try {
      await getUsers({ page: 0 })
    } catch (error) {
      expect(error.message).toEqual('page phải là số nguyên dương')
    }
  })

  it('should throw error if page is not positive integer number', async () => {
    expect.assertions(1)

    try {
      await getUsers({ page: -1 })
    } catch (error) {
      expect(error.message).toEqual('page phải là số nguyên dương')
    }
  })

  it('should throw error if sortBy is incorrect', async () => {
    expect.assertions(1)

    try {
      await getUsers({ sortBy: '_id' } as any)
    } catch (error) {
      expect(error.message).toEqual(
        'sortBy phải là một trong createdAt, reverse_createdAt',
      )
    }
  })

  it('should return users correctly without password', async () => {
    expect.assertions(1)

    const users = [
      {
        username: '001837273',
        name: 'Trịnh Trung Trinh',
        birthdate: new Date('2002-08-21T18:35:19.472Z'),
        hometown: 'Kiên Giang',
        sex: 'male',
        schoolYear: 2019,
        group: 'boarding',
        boardingRoom: '001',
        class: 'math',
        roles: ['student'],
        createdAt: new Date('2019-08-21T18:35:19.472Z'),
        updatedAt: new Date('2019-08-21T18:35:19.472Z'),
      },
      {
        username: '001837274',
        name: 'Trần Trân Trâu',
        birthdate: new Date('2002-10-01T18:35:19.472Z'),
        hometown: 'Phú Quốc',
        sex: 'male',
        schoolYear: 2019,
        group: 'boarding',
        boardingRoom: '001',
        class: 'math',
        roles: ['student'],
        createdAt: new Date('2019-07-21T18:35:19.472Z'),
        updatedAt: new Date('2019-07-21T18:35:19.472Z'),
      },
    ]

    mockingoose(UserModel).toReturn(2, 'count')
    mockingoose(UserModel).toReturn(users, 'find')

    const data = await getUsers({})
    expect(data).toMatchObject({
      total: 2,
      page: 1,
      limit: 10,
      pages: 1,
      edges: users,
    })
  })
})
