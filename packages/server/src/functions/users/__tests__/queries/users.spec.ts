import { gql } from 'apollo-server'
import {
  createTestClient,
  getObjectId,
  mockingooseResetAll,
} from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

const USERS = gql`
  query User($input: UsersInput) {
    users(input: $input) {
      total
      page
      pages
      limit
      edges {
        username
        name
        birthdate
        hometown
        sex
        schoolYear
        group
        boardingRoom
        class
        createdAt
        updatedAt
      }
    }
  }
`

describe('Test users query', () => {
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
    const { errors } = await $query({ query: USERS })

    expect(errors![0].message).toEqual('unauthorized')
  })

  it('should throw error if user roles is not include "admin"', async () => {
    expect.assertions(1)

    const { query: $query } = createTestClient({
      context: () => ({ user: { ...user, roles: ['student'] } }),
    })
    const { errors } = await $query({ query: USERS })

    expect(errors![0].message).toEqual('unauthorized')
  })

  it('should throw error if user roles is include "deactivated"', async () => {
    expect.assertions(1)

    const { query: $query } = createTestClient({
      context: () => ({ user: { ...user, roles: ['admin', 'deactivated'] } }),
    })
    const { errors } = await $query({ query: USERS })

    expect(errors![0].message).toEqual('unauthorized')
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
        createdAt: new Date('2019-07-21T18:35:19.472Z'),
        updatedAt: new Date('2019-07-21T18:35:19.472Z'),
      },
    ]

    mockingoose(UserModel).toReturn(2, 'count')
    mockingoose(UserModel).toReturn(users, 'find')

    const { data } = await query({
      query: USERS,
      variables: {},
    })

    expect(data.users).toMatchObject({
      total: 2,
      page: 1,
      limit: 10,
      pages: 1,
      edges: users,
    })
  })
})
