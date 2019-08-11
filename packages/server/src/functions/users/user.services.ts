import bcrypt from 'bcryptjs'
import bluebird from 'bluebird'
import Chance from 'chance'
import Debug from 'debug'
import { environment } from 'environment'
import { findChecker } from 'functions/checkers/checker.services'
import { CreateStudentInput, CreateUserInput } from 'functions/users/user.types'
import {
  createStudentsValidation,
  createUserValidation,
} from 'functions/users/user.validations'
import { verify } from 'jsonwebtoken'
import UserModel, { IUser } from 'models/User'

const chance = new Chance()

const debug = Debug('app:users:services')

export const createDefaultAdmin = async () => {
  const log = debug.extend('createDefaultAdmin')

  log('Verifying default admin user')

  const defaultAdmin = environment.defaultAdmin

  const createdUser = await UserModel.findOne({
    username: defaultAdmin.username,
  })

  if (createdUser) {
    log(`Default admin user is existing. Skip creating...`)
    return createdUser
  }

  log(`Default admin not found. Creating new user...`)

  const password = bcrypt.hashSync(defaultAdmin.password, 2)

  const admin = await UserModel.create({
    password,
    username: defaultAdmin.username,
    name: chance.name(),
    roles: ['admin'],
  })

  log(`Created default admin user`)

  return admin
}

export const getUserFromToken = async (token: string) => {
  const log = debug.extend('getUserFromToken')
  try {
    const decoded = verify(token, environment.jwtSecret) as { id: string }

    const user = await UserModel.findById(decoded.id)

    return user.toJSON() as IUser
  } catch (error) {
    return null
  }
}

export const createUser = async (user: CreateUserInput) => {
  await createUserValidation.validate(user)

  let existedUserQuery = {}

  if (user.studentId) {
    existedUserQuery = { studentId: user.studentId }
  } else if (user.username) {
    existedUserQuery = { username: user.username }
  }

  const existedUser = await UserModel.findOne(existedUserQuery).exec()

  if (existedUser) {
    throw new Error('tài khoản đã được sử dụng')
  }

  const checker = await findChecker({ input: { id: user.checkerId } })

  if (!checker) {
    throw new Error('checker_not_found')
  }

  const assignedUser = await UserModel.findOne({
    checkerId: user.checkerId,
  }).exec()

  if (assignedUser) {
    throw new Error('checkerId đã được sử dụng')
  }

  const createdUser = await UserModel.create({
    ...user,
    /** If user does not have username, use studentId instead */
    username: user.username || user.studentId,
    password: bcrypt.hashSync(user.password, 2),
  })

  return createdUser.toJSON()
}

/**
 * TODO: implement read user list from excel file and parse to json
 * TODO: implement upload excel file from client and save it to server
 * TODO: implement remove excel file when user list already parsed
 */
export const createStudents = async (userList: CreateStudentInput[]) => {
  await createStudentsValidation.validate(userList)
  const userNotCreatedList: { user: CreateStudentInput; reason: string }[] = []

  const createdUsers = (await bluebird.map(userList, async (user) => {
    const checker = await findChecker({ input: { id: user.checkerId } })

    if (!checker) {
      throw new Error('checker_not_found')
    }

    const assignedUser = await UserModel.findOne({
      checkerId: user.checkerId,
    }).exec()

    if (assignedUser) {
      userNotCreatedList.push({
        user,
        reason: 'checkerId đã được sử dụng',
      })

      return
    }

    const createdOrUpdatedUser = await UserModel.findOneAndUpdate(
      { studentId: user.studentId },
      {
        ...user,
        /** If user does not have username, use studentId instead */
        username: user.username || user.studentId,
        roles: ['student'],
        password: bcrypt.hashSync(user.password || user.studentId, 2),
      },
      { new: true, upsert: true },
    ).exec()

    return createdOrUpdatedUser.toJSON()
  })).filter((user) => user)

  return { createdUsers, userNotCreatedList }
}
