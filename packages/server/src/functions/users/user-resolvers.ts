import { compareSync } from 'bcrypt'
import { environment } from 'environment'
import { sign } from 'jsonwebtoken'
import { pick } from 'lodash'
import User from 'models/User'

const signIn = async (_, args: { username: string; password: string }) => {
  const user = await User.findOne({ username: args.username })

  if (!user) throw new Error('Không tìm thấy tài khoản')

  if (!compareSync(args.password, user.password)) {
    throw new Error('Mật khẩu không đúng')
  }

  return sign(
    pick(user, ['username', 'id', 'roles', 'password']),
    environment.jwtSecret,
  )
}

const Mutation = {
  signIn,
}
const Query = {}

export default { Query, Mutation }
