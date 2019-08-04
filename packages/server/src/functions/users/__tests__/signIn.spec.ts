import { gql } from 'apollo-server'
import bcrypt from 'bcryptjs'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`

describe('Test signIn mutation', () => {
  const { mutate } = createTestClient()
  beforeEach(mockingooseResetAll)

  it('should throw error if username or password was not provided', async () => {
    expect.assertions(2)
    const { errors } = await mutate({ mutation: SIGN_IN })

    expect(errors[0].message).toContain('"$username" of required')
    expect(errors[1].message).toContain('"$password" of required')
  })
  it('should throw error if user not found', async () => {
    expect.assertions(2)

    const { errors } = await mutate({
      mutation: SIGN_IN,
      variables: {
        username: 'testsignin',
        password: '',
      },
    })

    expect(errors[0].message).toEqual('Không tìm thấy tài khoản')
    expect(errors[0].path).toEqual(['signIn'])
  })
  it('should throw error if the password incorrectly', async () => {
    expect.assertions(2)
    const user = {
      username: 'testsignin',
      password: 'test',
    }

    mockingoose(UserModel).toReturn({ ...user, password: '123' }, 'findOne')
    const { errors } = await mutate({ mutation: SIGN_IN, variables: user })

    expect(errors[0].message).toEqual('Mật khẩu không đúng')
    expect(errors[0].path).toEqual(['signIn'])
  })
  it('should return user correctly if the user has accessing permission', async () => {
    expect.assertions(1)
    const user = {
      id: '5ce97bd9e37a4dbf663aeed3',
      roles: ['student'],
      username: 'testsignin',
      password: 'test',
    }

    mockingoose(UserModel).toReturn(
      { ...user, password: bcrypt.hashSync(user.password, 2) },
      'findOne',
    )

    const { data } = await mutate({
      mutation: SIGN_IN,
      variables: {
        username: user.username,
        password: user.password,
      },
    })

    expect(data!.signIn).toEqual(expect.stringMatching(/^/))
  })
})
