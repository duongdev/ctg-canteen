import bcrypt from 'bcryptjs'
import bluebird from 'bluebird'
import Chance from 'chance'
import Debug from 'debug'
import { environment } from 'environment'
import {
  CreateUserInput,
  CreateUserOptions,
  CreateUsersOptions,
  GetUsersFilter,
} from 'functions/users/user.types'
import {
  createUsersValidation,
  createUserValidation,
  getUsersFilterValidation,
} from 'functions/users/user.validations'
import { verify } from 'jsonwebtoken'

import UserModel, { IUser } from 'models/User'
import { getSortByFromString, normalize } from 'utils/string'

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
  {
    overrideCheckerId = false,
    generatePasswordFromUsername = false,
  }: CreateUserOptions = {
    generatePasswordFromUsername: false,
    overrideCheckerId: false,
  },
) => {
  const parsedUser = createUserValidation.validateSync(user)
  const normalizedUsername = normalize(user.username)
  const existedUser = await UserModel.findOne({
    username: normalizedUsername,
  }).exec()

  let password = user.password
  if (generatePasswordFromUsername) {
    password = user.username
  }

  if (existedUser) {
    throw new Error('Mã người dùng đã được sử dụng')
  }

  if (!overrideCheckerId) {
    const assignedUser = await UserModel.findOne({
      checkerId: user.checkerId,
    }).exec()

    if (assignedUser) {
      throw new Error('Mã máy chấm công đã được sử dụng')
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
    ...parsedUser,
    username: normalizedUsername,
    password: bcrypt.hashSync(password, 2),
  })

  return {
    createdUser: createdUser.toJSON(),
    overriddenCheckerIdUser:
      overriddenCheckerIdUser && overriddenCheckerIdUser.toJSON(),
  }
}

export const createUsers = async (
  createdByUserId: IUser['id'],
  users: CreateUserInput[],
  { overrideCheckerIds = false }: CreateUsersOptions = {
    overrideCheckerIds: false,
  },
) => {
  if (!createdByUserId) {
    throw new Error('unauthorized')
  }

  const createdByUser = await UserModel.findById(createdByUserId).exec()

  if (!createdByUser) {
    throw new Error('unauthorized')
  }

  const parsedUsers = createUsersValidation.validateSync(
    users,
  ) as CreateUserInput[]

  const notImportedUsers: {
    user: CreateUserInput
    reason: string
  }[] = []

  const overriddenCheckerIdUsers: IUser[] = []

  const importedUsers = (await bluebird.map(parsedUsers, async (user) => {
    const normalizedUsername = normalize(user.username)

    if (overrideCheckerIds) {
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
        overriddenCheckerIdUser.username.toString() !==
          normalizedUsername.toString()
      ) {
        overriddenCheckerIdUsers.push(overriddenCheckerIdUser.toJSON())
      }
    } else {
      const assignedUser = await UserModel.findOne({
        checkerId: user.checkerId,
      }).exec()

      if (
        assignedUser &&
        assignedUser.username.toString() !== normalizedUsername.toString()
      ) {
        notImportedUsers.push({
          user,
          reason: 'Mã máy chấm công đã được sử dụng',
        })

        return
      }
    }

    const createdOrUpdatedUser = await UserModel.findOneAndUpdate(
      { username: normalizedUsername },
      {
        ...user,
        createdByUserId,
        username: normalizedUsername,
        roles: ['student'],
        password: bcrypt.hashSync(normalizedUsername.toString(), 2),
      },
      { new: true, upsert: true },
    ).exec()

    return createdOrUpdatedUser.toJSON()
  })).filter((user) => user)

  return { importedUsers, notImportedUsers, overriddenCheckerIdUsers }
}

export const getUsers = async ({
  sortBy = 'reverse_createdAt',
  limit = 10,
  page = 1,
}: GetUsersFilter = {}) => {
  await getUsersFilterValidation.validate({
    sortBy,
    limit,
    page,
  })

  const $sortBy = getSortByFromString(sortBy)
  const skip = (page - 1) * limit
  const query = {}
  const [users, total] = await Promise.all([
    UserModel.find(query)
      .sort($sortBy)
      .skip(skip)
      .limit(limit)
      .exec(),
    UserModel.count(query).exec(),
  ])

  return {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    edges: users.map((user) => user.toJSON()),
  }
}
