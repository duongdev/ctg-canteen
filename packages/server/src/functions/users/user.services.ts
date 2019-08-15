import bcrypt from 'bcryptjs'
import bluebird from 'bluebird'
import Chance from 'chance'
import Debug from 'debug'
import { environment } from 'environment'
import { CreateUserInput } from 'functions/users/user.types'
import {
  createStudentsValidation,
  createUserValidation,
} from 'functions/users/user.validations'
import { verify } from 'jsonwebtoken'
import UserModel, { IUser } from 'models/User'
import moment from 'moment'
import { string2Date } from 'utils/string'

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
    group: 'other',
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

  const existedUser = await UserModel.findOne({
    username: user.username,
  }).exec()

  if (existedUser) {
    throw new Error('tài khoản đã được sử dụng')
  }

  const assignedUser = await UserModel.findOne({
    checkerId: user.checkerId,
  }).exec()

  if (assignedUser) {
    throw new Error('checkerId đã được sử dụng')
  }

  const createdUser = await UserModel.create({
    ...user,
    birthdate: string2Date(user.birthdate),
    password: bcrypt.hashSync(user.password, 2),
  })

  return createdUser.toJSON()
}

export const createStudents = async (students: CreateUserInput[]) => {
  await createStudentsValidation.validate(students)
  const notImportedStudents: {
    student: CreateUserInput
    reason: string
  }[] = []

  const importedStudents = (await bluebird.map(students, async (student) => {
    const assignedStudent = await UserModel.findOne({
      checkerId: student.checkerId,
    }).exec()

    if (
      assignedStudent &&
      assignedStudent.username.toString() !== student.username.toString()
    ) {
      notImportedStudents.push({
        student,
        reason: 'checkerId đã được sử dụng',
      })

      return
    }

    const createdOrUpdatedStudent = await UserModel.findOneAndUpdate(
      { username: student.username },
      {
        ...student,
        birthdate: string2Date(student.birthdate),
        roles: ['student'],
        password: bcrypt.hashSync(student.username.toString(), 2),
      },
      { new: true, upsert: true },
    ).exec()

    return createdOrUpdatedStudent.toJSON()
  })).filter((student) => student)

  return { importedStudents, notImportedStudents }
}
