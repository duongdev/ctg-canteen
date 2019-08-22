import { compareSync } from 'bcryptjs'
import chalk from 'chalk'
import Debug from 'debug'
import { environment } from 'environment'
import { FileUpload } from 'graphql-upload'
import { createResolver } from 'helpers/resolvers'
import { sign } from 'jsonwebtoken'
import { pick } from 'lodash'
import UserModel from 'models/User'
import { fileStorage } from 'utils/file-storage'
import { normalize } from 'utils/string'
import { EXCEL_MIMETYPES, readExcelFile, removeExcelFile } from 'utils/xlsx'
import { createUsers } from './user.services'
import { CreateUserInput } from './user.types'

const debug = Debug('app:users:resolvers')

export const signIn = async (
  _parent,
  args: { username: string; password: string },
) => {
  const log = debug.extend('signIn-mutation')
  const normalizedUsername = normalize(args.username)

  log(`Signing in user with username ${chalk.green(normalizedUsername)}`)

  const user = await UserModel.findOne({ username: normalizedUsername })

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

/** TODO: write unit testing for graphql file upload */
export const importUsers = createResolver({
  use: {
    hasRole: 'admin',
  },
  resolve: async (
    _parent,
    {
      file,
      overrideCheckerIds = false,
    }: { file: FileUpload; overrideCheckerIds?: boolean },
    { user },
  ) => {
    const filePath = await fileStorage(file, EXCEL_MIMETYPES)

    const users = readExcelFile(filePath) as CreateUserInput[]

    /** unlink excel file when read success */
    removeExcelFile(filePath)

    const {
      importedUsers,
      notImportedUsers,
      overriddenCheckerIdUsers,
    } = await createUsers(user.id, users, { overrideCheckerIds })

    return { importedUsers, notImportedUsers, overriddenCheckerIdUsers }
  },
})
