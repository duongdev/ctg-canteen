import moment from 'moment'
import normalizeString from 'normalize-strings'

export const string2Date = (string: string) => {
  return moment(new Date(string).toISOString()).toDate()
}

export const normalize = (string: string, lowercase: boolean = true) => {
  const $string = lowercase ? string.toLocaleLowerCase() : string
  return normalizeString($string)
}
