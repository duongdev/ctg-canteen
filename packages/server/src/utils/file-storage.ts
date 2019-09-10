import { UserInputError } from 'apollo-server'
import { environment } from 'environment'
import fs from 'fs'
import { FileUpload } from 'graphql-upload'
import path from 'path'

export const staticFolder = path.resolve(
  __dirname,
  environment.upload.folderPath,
)

export const fileStorage = async (
  file: FileUpload,
  acceptedMimetypes: string[],
): Promise<string> => {
  const { createReadStream, filename, mimetype } = await file

  if (!acceptedMimetypes.includes(mimetype)) {
    throw new UserInputError(
      `Định dạng tệp tin ${mimetype} không được chấp nhận. Chỉ chấp nhận những tệp tin có định dạng sau ${acceptedMimetypes.join(
        ', ',
      )}`,
    )
  }

  const readStream = createReadStream()

  if (!readStream.readable) {
    throw new Error('Không thể đọc tệp tin này')
  }

  if (!fs.existsSync(path.resolve(staticFolder))) {
    fs.mkdirSync(path.resolve(staticFolder), parseInt('0777', 8))
  }
  const filePath = path.resolve(__dirname, `${staticFolder}/${filename}`)

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
