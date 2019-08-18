import path from 'path'
import { readExcelFile } from 'utils/xlsx'

describe('Test readExcelFile utils', () => {
  it('should throw error if file does not exist', () => {
    try {
      readExcelFile('doest_not_exist')
    } catch (error) {
      expect.assertions(1)
      expect(error.message).toEqual(
        'ENOENT: no such file or directory, open \'doest_not_exist\'',
      )
    }
  })

  it('should throw error if file data is not JSON format', () => {
    expect.assertions(1)
    try {
      readExcelFile(path.resolve(__dirname, '../../../static/incorrect.xlsx'))
    } catch (error) {
      expect(error.message).toEqual('invalid_json_data')
    }
  })

  it('should return data correctly', () => {
    expect.assertions(1)

    const data = readExcelFile(
      path.resolve(__dirname, '../../../static/correct.xlsx'),
    )

    expect(data).toBeTruthy()
  })
})
