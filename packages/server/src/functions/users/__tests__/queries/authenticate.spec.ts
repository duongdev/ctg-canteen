import { gql } from 'apollo-server'
import { createTestClient } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'

const AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      id
      studentId
      name
      group
      boardingRoom
      class
      roles
      checkerId
    }
  }
`

describe('Test authenticate query', () => {
  const { query } = createTestClient()

  it('should return null if no user is specified', async () => {
    expect.assertions(1)

    const { data } = await query({ query: AUTHENTICATE })

    expect(data).toEqual({ authenticate: null })
  })

  it('should return user correctly', async () => {
    expect.assertions(1)

    const user = {
      id: '5ce97bd9e37a4dbf663aeed3',
      studentId: 'ID1',
      name: 'Nguyễn Văn A',
      group: 'boarding',
      boardingRoom: 'A-Class',
      class: 'A-Class',
      roles: ['student'],
      checkerId: '0901000239112',
    }

    const { query: contextQuery } = createTestClient({
      context: () => {
        return { user }
      },
    })

    const { data } = await contextQuery({ query: AUTHENTICATE })

    expect(data).toEqual({ authenticate: user })
  })
})
