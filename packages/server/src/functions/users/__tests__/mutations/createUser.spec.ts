import { gql } from 'apollo-server'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import { isEqual } from 'lodash'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!, $options: CreateUserOptions) {
    createUser(input: $input, options: $options) {
      createdUser {
        id
        _id: id
        username
        name
        birthdate
        hometown
        sex
        schoolYear
        group
        boardingRoom
        class
        roles
        checkerId
        createdAt
        updatedAt
        createdByUserId
        createdByUser {
          id
          username
        }
      }
      overriddenCheckerIdUser {
        id
        _id: id
        username
        birthdate
        checkerId
        name
        schoolYear
      }
    }
  }
`

describe('Test createUser mutation', () => {
  const user = {
    id: '5d5584e295aa9906a4beb0ad',
    username: 'admin',
    name: 'Sophia Lyons',
    roles: ['admin'],
  }

  const { mutate } = createTestClient({
    context: () => ({ user }),
  })

  beforeEach(mockingooseResetAll)

  it('should throw error if user is not sign in', async () => {
    expect.assertions(1)
    const { mutate: $mutate } = createTestClient()
    const { errors } = await $mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Nguyễn Văn An',
        },
      },
    })
    expect(errors![0].message).toEqual('unauthorized')
  })

  it('should throw error if user does not have "admin" role', async () => {
    expect.assertions(1)
    const { mutate: $mutate } = createTestClient({
      context: () => ({ user: { ...user, roles: ['other'] } }),
    })
    const { errors } = await $mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Nguyễn Văn An',
        },
      },
    })
    expect(errors![0].message).toEqual('permission_denied')
  })

  it('should throw error if user has "deactivated"', async () => {
    expect.assertions(1)
    const { mutate: $mutate } = createTestClient({
      context: () => ({ user: { ...user, roles: ['admin', 'deactivated'] } }),
    })
    const { errors } = await $mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Nguyễn Văn An',
        },
      },
    })
    expect(errors![0].message).toEqual('permission_denied')
  })

  it('should throw error if input is not specified', async () => {
    expect.assertions(1)
    const { errors } = await mutate({ mutation: CREATE_USER })
    expect(errors![0].message).toEqual(
      'Variable "$input" of required type "CreateUserInput!" was not provided.',
    )
  })

  it('should throw error if username is not specified', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: { input: {} },
    })
    expect(errors![0].message).toContain(
      'Field username of required type String! was not provided.',
    )
  })

  it('should throw error if username is not a string', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: { input: { username: 918 } },
    })
    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value 918 at "input.username"; Expected type String. String cannot represent a non string value: 918',
    )
  })

  it('should throw error if username has been taken', async () => {
    expect.assertions(1)

    const existedUser = {
      _id: '5d5584e295aa9906a4beb0ad',
      id: '5d5584e295aa9906a4beb0ad',
      username: 'taken_username',
      name: 'Đã được sử dụng',
    }

    mockingoose(UserModel).toReturn(existedUser, 'findOne')
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: { username: 'taken_username', name: 'Ngừ Tâm', password: '123' },
      },
    })

    expect(errors![0].message).toEqual('Mã người dùng đã được sử dụng')
  })

  it('should throw error if name is not specified', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: { input: { username: 'username' } },
    })
    expect(errors![0].message).toContain(
      'Field name of required type String! was not provided.',
    )
  })

  it('should throw error if name is not a string', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 192,
        },
      },
    })
    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value 192 at "input.name"; Expected type String. String cannot represent a non string value: 192',
    )
  })

  it('should throw error if password is not specified and "generatePasswordFromUsername" is not specified', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: { input: { username: 'username', name: 'Trần Tầm Ngư' } },
    })
    expect(errors![0].message).toEqual('Mật khẩu không được để trống')
  })

  it('should throw error if checkerId has assigned to other and "overrideCheckerId" is not specified or false', async () => {
    expect.assertions(1)

    const assignedUser = {
      username: 'assigned',
      name: 'Trung Trinh',
      checkerId: '00102',
    }

    mockingoose(UserModel).toReturn((query) => {
      const queryOptions = (query as any).getQuery()
      if (isEqual(queryOptions, { checkerId: '00102' })) {
        return assignedUser
      }

      return null
    }, 'findOne')
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trần Tầm Ngư',
          password: '12345678',
          checkerId: '00102',
        },
      },
    })
    expect(errors![0].message).toEqual('Mã máy chấm công đã được sử dụng')
  })

  it('should throw error if birthdate is not a date', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: 'not_date',
        },
      },
    })

    expect(errors![0].message).toContain(
      'Ngày sinh phải đúng định dạng MM/DD/YYYY',
    )
  })

  it('should throw error if hometown is not a string', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          hometown: 9999,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value 9999 at "input.hometown"; Expected type String. String cannot represent a non string value: 9999',
    )
  })

  it('should throw error if sex is not a string', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          sex: 8888,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value 8888 at "input.sex"; Expected type String. String cannot represent a non string value: 8888',
    )
  })

  it('should throw error if sex is not "male" or "female"', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          sex: 'Nam',
        },
      },
    })

    expect(errors![0].message).toEqual(
      'Giới tính phải là một trong male, female',
    )
  })

  it('should throw error if class is incorrect', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          class: 'Toán',
        },
      },
    })

    expect(errors![0].message).toEqual(
      'Lớp học phải là một trong các lớp sau none, math, informatics, physics, chemistry, biology, english, literature, history, geography, normal',
    )
  })

  it('should throw error if schoolYear is not a number', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          schoolYear: 'Năm học 2019',
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value "Năm học 2019" at "input.schoolYear"; Expected type Int. Int cannot represent non-integer value: "Năm học 2019"',
    )
  })

  it('should throw error if group is not a string', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          group: 8888,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value 8888 at "input.group"; Expected type String. String cannot represent a non string value: 8888',
    )
  })

  it('should throw error if boardingRoom is not a string', async () => {
    expect.assertions(1)
    const { errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: 'username',
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          boardingRoom: 8888,
        },
      },
    })

    expect(errors![0].message).toContain(
      'Variable "$input" got invalid value 8888 at "input.boardingRoom"; Expected type String. String cannot represent a non string value: 8888',
    )
  })

  it('createdUser.username should be normalized', async () => {
    expect.assertions(1)

    const user = {
      _id: '5d5584e295aa9906a4beb0ad',
      id: '5d5584e295aa9906a4beb0ad',
      username: 'username',
      name: 'Trung Quân',
      birthdate: new Date(),
      schoolYear: 2018,
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const { data } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: `username~!@#$%^&*()_+-[]{}\|';'":<>,./?`,
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          boardingRoom: '8888',
        },
      },
    })

    expect(data.createUser.createdUser.username).toEqual('username')
  })

  it('createdUser should return correctly', async () => {
    expect.assertions(1)

    const user = {
      _id: '5d5584e295aa9906a4beb0ad',
      id: '5d5584e295aa9906a4beb0ad',
      username: 'username',
      name: 'Trung Quân',
      birthdate: new Date(),
      schoolYear: 2018,
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const { data } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: `username~!@#$%^&*()_+-[]{}\|';'":<>,./?`,
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          boardingRoom: '8888',
        },
      },
    })

    expect(data.createUser.createdUser).toMatchObject(user)
  })

  it('overriddenCheckerIdUser should return correctly if checkerId has assigned to other and "overrideCheckerId" is true', async () => {
    expect.assertions(2)

    const user = {
      _id: '5d5584e295aa9906a4beb0ad',
      id: '5d5584e295aa9906a4beb0ad',
      username: 'username',
      name: 'Trung Quân',
      birthdate: new Date(),
      schoolYear: 2018,
      checkerId: '00102',
    }

    const assignedUser = {
      _id: '5d5584e295aa9906a4beb012',
      id: '5d5584e295aa9906a4beb012',
      username: 'assigned',
      name: 'Trung Trinh',
      birthdate: new Date(),
      schoolYear: 2018,
      checkerId: '00102',
    }

    mockingoose(UserModel).toReturn((query) => {
      const queryOptions = (query as any).getQuery()
      if (isEqual(queryOptions, { checkerId: '00102' })) {
        return assignedUser
      }

      return null
    }, 'findOne')
    mockingoose(UserModel).toReturn(
      { ...assignedUser, checkerId: null },
      'findOneAndUpdate',
    )
    mockingoose(UserModel).toReturn(user, 'save')

    const { data } = await mutate({
      mutation: CREATE_USER,
      variables: {
        input: {
          username: `username`,
          name: 'Trung Quân',
          password: '12345678',
          birthdate: new Date(),
          boardingRoom: '8888',
          checkerId: '00102',
        },
        options: {
          overrideCheckerId: true,
        },
      },
    })

    expect(data.createUser.createdUser).toMatchObject(user)
    expect(data.createUser.overriddenCheckerIdUser).toMatchObject({
      ...assignedUser,
      checkerId: null,
    })
  })
})
