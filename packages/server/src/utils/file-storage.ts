import { ApolloError, UserInputError } from 'apollo-server'
import { environment } from 'environment'
import fs from 'fs'
import { FileUpload } from 'graphql-upload'
import path from 'path'

export const fileStorage = async (
  file: FileUpload,
  acceptedMimetypes: string[],
): Promise<string> => {
  const { createReadStream, filename, mimetype } = await file

  if (!acceptedMimetypes.includes(mimetype)) {
    throw new UserInputError(
      `file type ${mimetype} is not accepted. Only ${acceptedMimetypes.join(
        ', ',
      )} are accepted`,
    )
  }

  const readStream = createReadStream()

  if (!readStream.readable) {
    throw new ApolloError('Can not read excel file', '500')
  }

  const folder = environment.upload.folder
  if (!fs.existsSync(path.resolve(__dirname, `../${folder}`))) {
    fs.mkdirSync(path.resolve(__dirname, `../${folder}`), parseInt('0777', 8))
  }
  const filePath = path.resolve(__dirname, `../${folder}/${filename}`)

  return await new Promise((resolve, reject) => {
    readStream
      .on('error', (error) => {
        fs.unlinkSync(filePath)
        reject(error)
      })
      .pipe(fs.createWriteStream(filePath))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve(filePath))
  })
}
