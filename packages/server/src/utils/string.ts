import moment from 'moment'

export const string2Date = (string: string) => {
  return moment(new Date(string).toISOString()).toDate()
}
