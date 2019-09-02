import bcrypt from 'bcryptjs'
import { createUser } from 'functions/users/user.services'
import { mockingooseResetAll } from 'helpers/test-helpers'
import { isEqual } from 'lodash'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

describe('Test createUser service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw an error if password is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        group: 'boarding',
        // password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Mật khẩu không được để trống')
    }
  })

  it('should throw an error if class is incorrect', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math_incorrect',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'Lớp học phải là một trong các lớp sau none, math, informatics, physics, chemistry, biology, english, literature, history, geography, normal',
      )
    }
  })

  it('should throw an error if username is not specified', async () => {
    try {
      const user = {
        // username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Mã người dùng không được để trống')
    }
  })

  it('should throw an error if sex is incorrect', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male_incorrect',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Giới tính phải là một trong male, female')
    }
  })

  it('should throw an error if the user group is incorrect', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        group: 'not_specified',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'Nhóm phải là một trong các nhóm sau boarding, outpatient, semi-boarding, teacher, other',
      )
    }
  })

  it('should throw an error if birthdate is not match MM/DD/YYYY format', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: 'new Date().toISOString()',
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Ngày sinh phải đúng định dạng MM/DD/YYYY')
    }
  })

  it('should throw error if checkerId already used and overrideCheckerId option is not specified', async () => {
    const assignedCheckerIdUser = {
      username: 'assigned_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn((query) => {
      const queryOptions = (query as any).getQuery()
      if (isEqual(queryOptions, { checkerId: '09010002391121' })) {
        return assignedCheckerIdUser
      }

      return null
    }, 'findOne')
    mockingoose(UserModel).toReturn(user, 'save')

    try {
      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Mã máy chấm công đã được sử dụng')
    }
  })

  it('should return created user and overriddenCheckerIdUser correctly if overrideCheckerId option is true', async () => {
    const assignedCheckerIdUser = {
      username: 'assigned_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(
      { ...assignedCheckerIdUser, checkerId: null },
      'findOneAndUpdate',
    )
    mockingoose(UserModel).toReturn(user, 'save')

    const data = await createUser(user as any, { overrideCheckerId: true })
    expect(data).toMatchObject({
      createdUser: {
        ...user,
        birthdate: new Date(user.birthdate),
      },
      overriddenCheckerIdUser: {
        ...assignedCheckerIdUser,
        birthdate: new Date(assignedCheckerIdUser.birthdate),
        checkerId: null,
      },
    })
  })

  it('should throw error if the username has been taken', async () => {
    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(user, 'findOne')
    mockingoose(UserModel).toReturn(user, 'save')

    try {
      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Mã người dùng đã được sử dụng')
    }
  })

  it('createdUser.password should be hashed', async () => {
    expect.assertions(1)

    const user = {
      _id: '5d5584e295aa9906a4beb0ad',
      id: '5d5584e295aa9906a4beb0ad',
      username: 'username',
      name: 'Trung Quân',
      password: bcrypt.hashSync('12345678', 2),
      birthdate: new Date(),
      schoolYear: 2018,
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const data = await createUser({
      username: 'username',
      name: 'Trung Quân',
      password: '12345678',
      birthdate: new Date(),
      schoolYear: 2018,
    })

    expect(data.createdUser.password).toEqual(user.password)
  })

  it('createdUser.password should be hashed of username if "generatePasswordFromUsername" is true', async () => {
    expect.assertions(1)

    const user = {
      _id: '5d5584e295aa9906a4beb0ad',
      id: '5d5584e295aa9906a4beb0ad',
      username: 'username',
      name: 'Trung Quân',
      password: bcrypt.hashSync('username', 2),
      birthdate: new Date(),
      schoolYear: 2018,
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const data = await createUser(
      {
        username: 'username',
        name: 'Trung Quân',
        password: null,
        birthdate: new Date(),
        schoolYear: 2018,
      },
      {
        generatePasswordFromUsername: true,
      },
    )

    expect(data.createdUser.password).toEqual(user.password)
  })

  it('should return created user correctly if birthdate is not specified', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const data = await createUser(user as any)

    expect(data).toMatchObject({
      createdUser: user,
    })
  })

  it('should return created user correctly if birthdate is empty string', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      boardingRoom: 'Phòng 202',
      birthdate: '',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const data = await createUser(user as any)

    expect(data).toMatchObject({
      createdUser: {
        ...user,
        birthdate: null,
      },
    })
  })

  it('should return created user correctly', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'math',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(user, 'save')

    const data = await createUser(user as any)

    expect(data).toMatchObject({
      createdUser: { ...user, birthdate: new Date(user.birthdate) },
    })
  })
})
