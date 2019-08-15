import isEmpty from 'lodash/isEmpty'
import xlsx from 'xlsx'

export const EXCEL_MIMETYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
]

/**
 * this function will read excel file from first worksheet
 * @param path Path of excel file
 */
export const readExcelFile = (path: string) => {
  const workbook = xlsx.readFile(path)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const data = xlsx.utils.sheet_to_json(worksheet)

  if (isEmpty(data)) return data

  const fields = Object.keys(data[0])

  if (fields.includes('__EMPTY')) {
    throw new Error('invalid_json_data')
  }

  return data
}
