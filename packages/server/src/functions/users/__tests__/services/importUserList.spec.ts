import { importUserList } from 'functions/users/user.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import mockingoose from 'mockingoose'
import CheckerModel from 'models/Checker'
import UserModel from 'models/User'

describe('Test importUserList service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw an error if the user data is empty', async () => {
    try {
      await importUserList([])
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('user data is required')
    }
  })
  it('should throw an error if studentId is not specified', async () => {
    try {
      const mockUserList = [
        {
          // studentId: 'not_specified',
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].studentId is a required field')
    }
  })

  it('should throw an error if birthday is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          // birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].birthday is a required field')
    }
  })

  it('should throw an error if boardingRoom is not specified', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthday: new Date(),
          // boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
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
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          // class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
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
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          // group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
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
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          // hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
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
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          // schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
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
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          // name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
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
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          // sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('[0].sex is a required field')
    }
  })

  it('should throw an error if the user group is incorrect', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthday: new Date(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'not_specified',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        '[0].group must be one of the following values: boarding, outpatient, semi-boarding, teacher, other',
      )
    }
  })

  it('should throw an error if birthday is not a date', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'not_specified',
          birthday: 'new Date()',
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'not_specified',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'not_specified',
        },
      ]
      await importUserList(mockUserList as any)
    } catch (error) {
      expect.assertions(1)

      expect(error.message).toEqual(
        '[0].birthday must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"new Date()"`).',
      )
    }
  })

  it('should throw error if has one checkerId does not exists', async () => {
    try {
      const mockUserList = [
        {
          studentId: 'test_studentId',
          birthday: new Date(),
          boardingRoom: 'Phòng 202',
          checkerId: 'does_not_exist',
          class: 'Chuyên Văn A',
          group: 'boarding',
          hometown: 'Nghệ An',
          schoolYear: 2013,
          name: 'Nguyễn Văn A',
          sex: 'Nam',
        },
      ]

      await importUserList(mockUserList)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('checker_not_found')
    }
  })

  it('should return a list of user has not been created if checkerId has assigned to an existing user', async () => {
    expect.assertions(1)
    const existedUser = {
      studentId: 'existed_studentId',
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const user = {
      studentId: 'test_studentId',
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const checker_1 = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(existedUser, 'findOne')
    mockingoose(UserModel).toReturn([user], 'find')
    mockingoose(CheckerModel).toReturn(checker_1, 'findOne')

    const data = await importUserList([user])

    expect(data).toEqual({
      createdUsers: [],
      userNotCreatedList: [
        {
          user,
          reason: 'checkerId đã được gán cho học sinh khác',
        },
      ],
    })
  })

  it('should return created or updated user correctly if the studentId does not exists', async () => {
    expect.assertions(1)
    const user = {
      studentId: 'test_studentId',
      birthday: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'Chuyên Văn A',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'Nam',
    }

    const checker_1 = {
      id: '09010002391121',
      name: 'Máy chấm công 1',
      card: '',
    }

    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')
    mockingoose(CheckerModel).toReturn(checker_1, 'findOne')

    const data = await importUserList([user])

    expect(data.createdUsers[0]).toMatchObject(user)
  })
})
