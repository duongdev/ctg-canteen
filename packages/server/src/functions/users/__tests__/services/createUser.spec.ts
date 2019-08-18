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
      expect(error.message).toEqual('password is a required field')
    }
  })

  it('should throw an error if class is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        // class: 'math',
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
      expect(error.message).toEqual('class is a required field')
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
        'class must be one of the following values: none, math, informatics, physics, chemistry, biology, english, literature, history, geography, normal',
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
      expect(error.message).toEqual('username is a required field')
    }
  })

  it('should throw an error if birthdate is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        // birthdate: new Date().toISOString(),
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
      expect(error.message).toEqual('birthdate is a required field')
    }
  })

  it('should throw an error if group is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        // group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('group is a required field')
    }
  })

  it('should throw an error if hometown is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthdate: new Date().toISOString(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'math',
        group: 'boarding',
        password: 'password',
        // hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('hometown is a required field')
    }
  })

  it('should throw an error if schoolYear is not specified', async () => {
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
        // schoolYear: 2013,
        name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('schoolYear is a required field')
    }
  })

  it('should throw an error if name is not specified', async () => {
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
        // name: 'not_specified',
        sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('name is a required field')
    }
  })

  it('should throw an error if sex is not specified', async () => {
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
        // sex: 'male',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('sex is a required field')
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
      expect(error.message).toEqual(
        'sex must be one of the following values: male, female',
      )
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
        'group must be one of the following values: boarding, outpatient, semi-boarding, teacher, other',
      )
    }
  })

  it('should throw an error if birthdate is not a iso date string format', async () => {
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

      expect(error.message).toContain('birthdate must be a `date` type')
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
      await createUser(user)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('checkerId already used')
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

    const data = await createUser(user, { overrideCheckerId: true })
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
      expect(error.message).toEqual('username has been taken')
    }
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

    const data = await createUser(user)

    expect(data).toMatchObject({
      createdUser: { ...user, birthdate: new Date(user.birthdate) },
    })
  })
})
