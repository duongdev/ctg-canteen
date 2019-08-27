import { isEmpty } from 'lodash'
import moment from 'moment'
import normalizeString from 'normalize-strings'

export const string2Date = (string: string | Date) => {
  return moment(new Date(string).toISOString()).toDate()
}

export const normalize = (string: string, lowercase: boolean = true) => {
  const $string = lowercase ? string.toLocaleLowerCase() : string
  return normalizeString($string)
}

export const getSortByFromString = (string: string) => {
  return isEmpty(string)
    ? { createdAt: -1 }
    : string.includes('reverse_')
    ? { [string.replace('reverse_', '')]: -1 }
    : { [string]: 1 }
}
