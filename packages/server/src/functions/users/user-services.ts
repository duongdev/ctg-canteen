import * as bcrypt from 'bcrypt'
import * as Chance from 'chance'
import Debug from 'debug'
import { environment } from 'environment'
import IUser from 'interfaces/User'
import { verify } from 'jsonwebtoken'
import User from 'models/User'

const chance = new Chance()

const debug = Debug('app:users:services')

export const createDefaultAdmin = async () => {
  const log = debug.extend('createDefaultAdmin')

  log('Verifying default admin user')

  const defaultAdmin = environment.defaultAdmin

  const createdUser = await User.findOne({
    username: defaultAdmin.username,
  })

  if (createdUser) {
    log(`Default admin user is existing. Skip creating...`)
    return createdUser
  }

  log(`Default admin not found. Creating new user...`)

  const password = bcrypt.hashSync(defaultAdmin.password, 2)

  const admin = await User.create({
    password,
    username: defaultAdmin.username,
    name: chance.name(),
  })

  log(`Created default admin user`)

  return admin
}

export const getUserFromToken = async (token: string) => {
  const log = debug.extend('getUserFromToken')
  try {
    const decoded = verify(token, environment.jwtSecret) as { id: string }

    const user = await User.findById(decoded.id)

    return user.toJSON() as IUser
  } catch (error) {
    return null
  }
}
