import bcrypt from 'bcryptjs'
import { createStudents } from 'functions/users/user.services'
import { mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import CheckerModel from 'models/Checker'
import UserModel from 'models/User'

describe('Test createStudents service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw an error if the user data is empty', async () => {
    try {
      await createStudents([])
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('this field must have at least 1 items')
    }
  })
  it('should throw an error if studentId is not specified', async () => {
    try {
      const mockUserList = [
        {
          // studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].studentId is a required field')
    }
  })

  it('should throw an error if birthdate is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          // birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].birthdate is a required field')
    }
  })

  it('should throw an error if boardingRoom is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          // boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].boardingRoom is a required field')
    }
  })

  it('should throw an error if class is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          // class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].class is a required field')
    }
  })

  it('should throw an error if group is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          // group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].group is a required field')
    }
  })

  it('should throw an error if hometown is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          // hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].hometown is a required field')
    }
  })

  it('should throw an error if schoolYear is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          // schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].schoolYear is a required field')
    }
  })

  it('should throw an error if name is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          // name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].name is a required field')
    }
  })

  it('should throw an error if sex is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          // sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].sex is a required field')
    }
  })

  it('should throw an error if sex is incorrect', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'incorrect',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        '[0].sex must be one of the following values: male, female',
      )
    }
  })

  it('should throw an error if the user group is incorrect', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'not_specified',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        '[0].group must be one of the following values: boarding, outpatient, semi-boarding, teacher, other',
      )
    }
  })

  it('should throw an error if birthdate is not a date', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthdate: 'new Date()',
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createStudents(mockUserList as any)
    } catch (error) {
      expect.assertions(1)

      expect(error.message).toEqual(
        '[0].birthdate must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"new Date()"`).',
      )
    }
  })

  it('should throw error if has one checkerId does not exist', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'test_studentId',
          birthdate: new Date(),
          boardingRoom: 'Phòng 202',
          checkerId: 'does_not_exist',
          class: 'history',
          group: 'boarding',
          hometown: 'Nghệ An',
          schoolYear: 2013,
          name: 'Nguyễn Văn A',
          sex: 'male',
        },
      ]

      await createStudents(mockUserList)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('checker_not_found')
    }
  })

  it('createdStudent.roles should be ["student"]', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const createdStudent = await createStudents([user])

    expect(createdStudent.createdUsers[0].roles).toEqual(['student'])
  })

  it('should return a list of user has not been created if checkerId has assigned to an existing user', async () => {
    expect.assertions(1)
    const existedUser = {
      studentId: 'existed_studentId',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const user = {
      studentId: 'test_studentId',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(existedUser, 'findOne')
    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const data = await createStudents([user])

    expect(data).toEqual({
      createdUsers: [],
      userNotCreatedList: [
        {
          user,
          reason: 'checkerId đã được sử dụng',
        },
      ],
    })
  })

  it('createdUser.password should be hashed', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      password: 'password',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    const hashPass = bcrypt.hashSync(user.password, 2)

    mockingoose(UserModel).toReturn(
      {
        ...user,
        password: hashPass,
      },
      'findOneAndUpdate',
    )
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const data = await createStudents([user])

    expect(data.createdUsers[0].password).toEqual(hashPass)
  })

  it('createdUser.password should be a hash of studentId by default', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    const hashPass = bcrypt.hashSync(user.studentId, 2)

    mockingoose(UserModel).toReturn(
      {
        ...user,
        password: hashPass,
      },
      'findOneAndUpdate',
    )
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const data = await createStudents([user])

    expect(data.createdUsers[0].password).toEqual(hashPass)
  })

  it('should return created or updated user correctly if the studentId does not exist', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const checker = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')
    mockingoose(CheckerModel).toReturn(checker, 'findOne')

    const data = await createStudents([user])

    expect(data.createdUsers[0]).toMatchObject(user)
  })
})
