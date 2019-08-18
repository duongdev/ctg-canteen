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
import { EXCEL_MIMETYPES, readExcelFile } from 'utils/xlsx'
import { createStudents } from './user.services'
import { CreateUserInput } from './user.types'

const debug = Debug('app:users:resolvers')

export const signIn = async (
  _parent,
  args: { username: string; password: string },
) => {
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

// TODO: write unit testing for graphql file upload.
export const importStudents = createResolver({
  resolve: async (_parent, { file }: { file: FileUpload }) => {
    const filePath = await fileStorage(file, EXCEL_MIMETYPES)

    const students = readExcelFile(filePath) as CreateUserInput[]

    const { importedStudents, notImportedStudents } = await createStudents(
      students,
    )

    // TODO: Remove uploaded file after all.

    return { importedStudents, notImportedStudents }
  },
})
