import { gql } from 'apollo-server'
import { createTestClient } from 'helpers/test-helpers'

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
      checker {
        id
        name
        card
      }
    }
  }
`

describe('Test authenticate', () => {
  const { query } = createTestClient()

  it('should return null if has no user specified', async () => {
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
      checker: {
        id: '0901000239112',
        name: 'Máy chấm công 1',
        card: '',
      },
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