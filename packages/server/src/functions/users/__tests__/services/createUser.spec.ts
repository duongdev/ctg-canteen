import { createUser } from 'functions/users/user.services'
import { mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

describe('Test createUser service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw an error if the user data is empty', async () => {
    try {
      await createUser({} as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'you must provide at least one of studentId or username',
      )
    }
  })

  it('should throw an error if password is not specified', async () => {
    try {
      const user = {
        studentId: 'not_specified',
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
        studentId: 'not_specified',
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
        studentId: 'not_specified',
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

  it('should throw an error if username and studentId is not specified', async () => {
    try {
      const user = {
        // studentId: 'not_specified',
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
      expect(error.message).toEqual(
        'you must provide at least one of studentId or username',
      )
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

  /** It conflict with "tài khoản đã được sử dụng",
   * because the user data has return by mockingoose
   */
  // it('should throw error if checkerId has assigned to an existing user', async () => {
  //   const existedUser = {
  //     username: 'existed_username',
  //     birthdate: new Date().toISOString(),
  //     boardingRoom: 'Phòng 202',
  //     checkerId: '09010002391121',
  //     class: 'math',
  //     group: 'boarding',
  //     password: 'password',
  //     hometown: 'Nghệ An',
  //     schoolYear: 2013,
  //     name: 'Nguyễn Văn A',
  //     sex: 'male',
  //   }

  //   const user = {
  //     username: 'test_username',
  //     birthdate: new Date().toISOString(),
  //     boardingRoom: 'Phòng 202',
  //     checkerId: '09010002391121',
  //     class: 'math',
  //     group: 'boarding',
  //     password: 'password',
  //     hometown: 'Nghệ An',
  //     schoolYear: 2013,
  //     name: 'Nguyễn Văn A',
  //     sex: 'male',
  //   }

  //   mockingoose(UserModel).toReturn(existedUser, 'findOne')
  //   mockingoose(UserModel).toReturn(user, 'save')

  //   try {
  //     await createUser(user as any)
  //   } catch (error) {
  //     expect.assertions(1)
  //     expect(error.message).toEqual('checkerId đã được sử dụng')
  //   }
  // })

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
      expect(error.message).toEqual('tài khoản đã được sử dụng')
    }
  })

  it('should throw error if has studentId user and studentId already exist', async () => {
    const user = {
      studentId: 'test_studentId',
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
      expect(error.message).toEqual('tài khoản đã được sử dụng')
    }
  })

  it('should return created user correctly if the username does not exist', async () => {
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

    expect(data).toMatchObject({ ...user, birthdate: new Date(user.birthdate) })
  })

  it('should return created user as student correctly if has studentId and studentId does not exist', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
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
      ...user,
      birthdate: new Date(user.birthdate),
      roles: ['student'],
    })
  })
})
