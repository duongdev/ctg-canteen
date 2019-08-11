import { createUser } from 'functions/users/user.services'
import { mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import CheckerModel from 'models/Checker'
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
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        // password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('password is a required field')
    }
  })

  it('should throw an error if username and studentId is not specified', async () => {
    try {
      const user = {
        // studentId: 'not_specified',
        // username: 'not_specified',
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'you must provide at least one of studentId or username',
      )
    }
  })

  it('should throw an error if birthday is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        // birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('birthday is a required field')
    }
  })

  it('should throw an error if boardingRoom is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthday: new Date(),
        // boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('boardingRoom is a required field')
    }
  })

  it('should throw an error if group is not specified', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        // group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
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
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        // hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
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
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        // schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
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
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        // name: 'not_specified',
        sex: 'not_specified',
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
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        // sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('sex is a required field')
    }
  })

  it('should throw an error if the user group is incorrect', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthday: new Date(),
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'not_specified',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'group must be one of the following values: boarding, outpatient, semi-boarding, teacher, other',
      )
    }
  })

  it('should throw an error if birthday is not a date', async () => {
    try {
      const user = {
        username: 'not_specified',
        birthday: 'new Date()',
        boardingRoom: 'not_specified',
        checkerId: 'not_specified',
        class: 'not_specified',
        group: 'boarding',
        password: 'password',
        hometown: 'not_specified',
        schoolYear: 2013,
        name: 'not_specified',
        sex: 'not_specified',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)

      expect(error.message).toEqual(
        'birthday must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"new Date()"`).',
      )
    }
  })

  it('should throw error if has one checkerId does not exists', async () => {
    try {
      const user = {
        username: 'test_username',
        birthday: new Date(),
        boardingRoom: 'Phòng 202',
        checkerId: 'does_not_exist',
        class: 'Chuyên Văn A',
        group: 'boarding',
        password: 'password',
        hometown: 'Nghệ An',
        schoolYear: 2013,
        name: 'Nguyễn Văn A',
        sex: 'Nam',
      }

      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('checker_not_found')
    }
  })

  // it('should throw error if checkerId has assigned to an existing user', async () => {
  //   const existedUser = {
  //     username: 'existed_username',
  //     birthday: new Date(),
  //     boardingRoom: 'Phòng 202',
  //     checkerId: '09010002391121',
  //     class: 'Chuyên Văn A',
  //     group: 'boarding',
  //     password: 'password',
  //     hometown: 'Nghệ An',
  //     schoolYear: 2013,
  //     name: 'Nguyễn Văn A',
  //     sex: 'Nam',
  //   }

  //   const user = {
  //     username: 'test_username',
  //     birthday: new Date(),
  //     boardingRoom: 'Phòng 202',
  //     checkerId: '09010002391121',
  //     class: 'Chuyên Văn A',
  //     group: 'boarding',
  //     password: 'password',
  //     hometown: 'Nghệ An',
  //     schoolYear: 2013,
  //     name: 'Nguyễn Văn A',
  //     sex: 'Nam',
  //   }

  //   const checker = {
  //     id: '09010002391121',
  //     name: 'Máy chấm công 1',
  //     card: '',
  //   }

  //   mockingoose(UserModel).toReturn(existedUser, 'findOne')
  //   mockingoose(UserModel).toReturn(user, 'save')
  //   mockingoose(CheckerModel).toReturn(checker, 'findOne')
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
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'findOne')
    mockingoose(UserModel).toReturn(user, 'save')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')
    try {
      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('tài khoản đã được sử dụng')
    }
  })

  it('should throw error if has studentId user and studentId is existed', async () => {
    const user = {
      studentId: 'test_studentId',
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'findOne')
    mockingoose(UserModel).toReturn(user, 'save')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')
    try {
      await createUser(user as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('tài khoản đã được sử dụng')
    }
  })

  it('should return created user correctly if the username does not exists', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'save')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const data = await createUser(user as any)

    expect(data).toMatchObject(user)
  })

  it('should return created user as student correctly if has studentId and studentId does not exists', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'save')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const data = await createUser(user as any)

    expect(data).toMatchObject({
      ...user,
      roles: ['student'],
    })
  })
})
