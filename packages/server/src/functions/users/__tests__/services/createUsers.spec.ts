import bcrypt from 'bcryptjs'
import { createUsers } from 'functions/users/user.services'
import { getObjectId, mockingooseResetAll } from 'helpers/test-helpers'
import { isEqual } from 'lodash'
import mockingoose from 'mockingoose'
import UserModel from 'models/User'

describe('Test createUsers service', () => {
  beforeEach(mockingooseResetAll)

  it('should throw an error if the user data is empty', async () => {
    try {
      await createUsers([])
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Danh sách không được rỗng')
    }
  })

  it('should throw an error if username is not specified', async () => {
    try {
      const mockUserList = [
        {
          // username: 'not_specified',
          birthdate: new Date().toISOString(),
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
      await createUsers(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual('Mã người dùng không được để trống')
    }
  })

  it('should throw an error if class is incorrect', async () => {
    try {
      const mockUserList = [
        {
          username: 'not_specified',
          birthdate: new Date().toISOString(),
          boardingRoom: 'not_specified',
          checkerId: 'not_specified',
          class: 'english_incorrect',
          group: 'boarding',
          hometown: 'not_specified',
          schoolYear: 2013,
          name: 'not_specified',
          sex: 'male',
        },
      ]
      await createUsers(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'Lớp học phải là một trong các lớp sau none, math, informatics, physics, chemistry, biology, english, literature, history, geography, normal',
      )
    }
  })

  it('should throw an error if sex is incorrect', async () => {
    try {
      const mockUserList = [
        {
          username: 'not_specified',
          birthdate: new Date().toISOString(),
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
      await createUsers(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'Giới tính phải là một trong male, female',
      )
    }
  })

  it('should throw an error if the user group is incorrect', async () => {
    try {
      const mockUserList = [
        {
          username: 'not_specified',
          birthdate: new Date().toISOString(),
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
      await createUsers(mockUserList as any)
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'Nhóm phải là một trong các nhóm sau boarding, outpatient, semi-boarding, teacher, other',
      )
    }
  })

  it('should throw an error if birthdate is not a date', async () => {
    try {
      const mockUserList = [
        {
          username: 'not_specified',
          birthdate: 'new Date().toISOString()',
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
      await createUsers(mockUserList as any)
    } catch (error) {
      expect.assertions(1)

      expect(error.message).toEqual('Ngày sinh phải đúng định dạng MM/DD/YYYY')
    }
  })

  it('createdStudent.roles should be ["student"]', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')

    const createdStudent = await createUsers([user])

    expect(createdStudent.importedUsers[0].roles).toEqual(['student'])
  })

  it('should return a list of user has not been created if checkerId has assigned to an existing user and overrideCheckerId is false', async () => {
    expect.assertions(1)
    const existedUser = {
      username: 'existed_username',
      birthdate: new Date().toISOString(),
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
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(existedUser, 'findOne')
    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')

    const data = await createUsers([user])

    expect(data).toEqual({
      importedUsers: [],
      overriddenCheckerIdUsers: [],
      notImportedUsers: [
        {
          user,
          reason: 'Mã máy chấm công đã được sử dụng',
        },
      ],
    })
  })

  it('should return a list of user has been created and a list of user has been overridden checkerId if checkerId has assigned to an existing user and overrideCheckerId is true', async () => {
    expect.assertions(1)
    const existedUserId = getObjectId()
    const existedUser = {
      _id: existedUserId,
      id: existedUserId.toHexString(),
      username: 'existed_username',
      birthdate: new Date(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
      roles: ['student'],
    }

    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const createdUserId = getObjectId()

    mockingoose(UserModel).toReturn((query) => {
      const queryOptions = (query as any).getQuery()
      if (isEqual(queryOptions, { checkerId: '09010002391121' })) {
        return { ...existedUser, checkerId: null, }
      }

      if (isEqual(queryOptions, { username: 'test_username' })) {
        return { ...user,  id: createdUserId, _id: createdUserId }
      }

      return {}
    }, 'findOneAndUpdate')

    const data = await createUsers([user], { overrideCheckerId: true })

    expect(data).toEqual({
      importedUsers: [
        {
          ...user,
          id: createdUserId.toHexString(),
          _id: createdUserId,
          roles: ['student'],
          birthdate: new Date(user.birthdate),
        },
      ],
      notImportedUsers: [],
      overriddenCheckerIdUsers: [{ ...existedUser, checkerId: null, }],
    })
  })

  it('createdUser.password should be hashed', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
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

    const hashPass = bcrypt.hashSync(user.password, 2)

    mockingoose(UserModel).toReturn(
      {
        ...user,
        password: hashPass,
      },
      'findOneAndUpdate',
    )

    const data = await createUsers([user])

    expect(data.importedUsers[0].password).toEqual(hashPass)
  })

  it('createdUser.password should be a hash of username by default', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    const hashPass = bcrypt.hashSync(user.username, 2)

    mockingoose(UserModel).toReturn(
      {
        ...user,
        password: hashPass,
      },
      'findOneAndUpdate',
    )

    const data = await createUsers([user])

    expect(data.importedUsers[0].password).toEqual(hashPass)
  })

  it('should return created or updated user correctly', async () => {
    expect.assertions(1)
    const user = {
      username: 'test_username',
      birthdate: new Date().toISOString(),
      boardingRoom: 'Phòng 202',
      checkerId: '09010002391121',
      class: 'history',
      group: 'boarding',
      hometown: 'Nghệ An',
      schoolYear: 2013,
      name: 'Nguyễn Văn A',
      sex: 'male',
    }

    mockingoose(UserModel).toReturn(user, 'findOneAndUpdate')

    const data = await createUsers([user])

    expect(data.importedUsers[0]).toMatchObject({
      ...user,
      birthdate: new Date(user.birthdate),
    })
  })
})
