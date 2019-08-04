import { compareSync } from 'bcrypt'
import chalk from 'chalk'
import Debug from 'debug'
import { environment } from 'environment'
import { sign } from 'jsonwebtoken'
import { pick } from 'lodash'
import UserModel from 'models/User'

const debug = Debug('app:users:resolvers')

const signIn = async (_, args: { username: string; password: string }) => {
  const log = debug.extend('signIn-mutation')

  log(`Signing in user with username ${chalk.green(args.username)}`)

  const user = await UserModel.findOne({ username: args.username })

  if (!user) {
    log(`User not found`)
    throw new Error('Không tìm thấy tài khoản')
  }

  if (!compareSync(args.password, user.password)) {
    log(`Wrong password`)
    throw new Error('Mật khẩu không đúng')
  }

  const token = sign(
    pick(user, ['username', 'id', 'roles', 'password']),
    environment.jwtSecret,
  )

  log('Signed in successfully')
  return token
}

const authenticate = async (_, args, ctx) => {
  return ctx.user
}

const Mutation = {
  signIn,
}
const Query = {
  authenticate,
}

export default { Query, Mutation }
