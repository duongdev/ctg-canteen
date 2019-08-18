import bcrypt from 'bcryptjs'
import bluebird from 'bluebird'
import Chance from 'chance'
import Debug from 'debug'
import { environment } from 'environment'
import { CreateUserInput, CreateUserOptions } from 'functions/users/user.types'
import {
  createUsersValidation,
  createUserValidation,
} from 'functions/users/user.validations'
import { verify } from 'jsonwebtoken'
import UserModel, { IUser } from 'models/User'
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

export const createUser = async (
  user: CreateUserInput,
  { overrideCheckerId = false }: CreateUserOptions = {
    overrideCheckerId: false,
  },
) => {
  await createUserValidation.validate(user)

  const existedUser = await UserModel.findOne({
    username: user.username,
  }).exec()

  if (existedUser) {
    throw new Error('username has been taken')
  }

  if (!overrideCheckerId) {
    const assignedUser = await UserModel.findOne({
      checkerId: user.checkerId,
    }).exec()

    if (assignedUser) {
      throw new Error('checkerId already used')
    }
  }

  const overriddenCheckerIdUser = await UserModel.findOneAndUpdate(
    {
      checkerId: user.checkerId,
    },
    {
      $set: {
        checkerId: null,
      },
    },
    {
      new: true,
    },
  )

  const createdUser = await UserModel.create({
    ...user,
    birthdate: string2Date(user.birthdate),
    password: bcrypt.hashSync(user.password, 2),
  })

  return {
    createdUser: createdUser.toJSON(),
    overriddenCheckerIdUser:
      overriddenCheckerIdUser && overriddenCheckerIdUser.toJSON(),
  }
}

export const createUsers = async (
  Users: CreateUserInput[],
  { overrideCheckerId = false }: CreateUserOptions = {
    overrideCheckerId: false,
  },
) => {
  await createUsersValidation.validate(Users)
  const notImportedUsers: {
    user: CreateUserInput
    reason: string
  }[] = []

  const overriddenCheckerIdUsers: IUser[] = []

  const importedUsers = (await bluebird.map(Users, async (user) => {
    if (overrideCheckerId) {
      const overriddenCheckerIdUser = await UserModel.findOneAndUpdate(
        {
          checkerId: user.checkerId,
        },
        {
          $set: {
            checkerId: null,
          },
        },
        {
          new: true,
        },
      ).exec()

      if (
        overriddenCheckerIdUser &&
        overriddenCheckerIdUser.username.toString() !== user.username.toString()
      ) {
        overriddenCheckerIdUsers.push(overriddenCheckerIdUser.toJSON())
      }
    } else {
      const assignedUser = await UserModel.findOne({
        checkerId: user.checkerId,
      }).exec()

      if (
        assignedUser &&
        assignedUser.username.toString() !== user.username.toString()
      ) {
        notImportedUsers.push({
          user,
          reason: 'checkerId already used',
        })

        return
      }
    }

    const createdOrUpdatedUser = await UserModel.findOneAndUpdate(
      { username: user.username },
      {
        ...user,
        birthdate: string2Date(user.birthdate),
        roles: ['User'],
        password: bcrypt.hashSync(user.username.toString(), 2),
      },
      { new: true, upsert: true },
    ).exec()

    return createdOrUpdatedUser.toJSON()
  })).filter((user) => user)

  return { importedUsers, notImportedUsers, overriddenCheckerIdUsers }
}
