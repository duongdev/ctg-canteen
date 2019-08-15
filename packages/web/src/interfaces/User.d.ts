export type IClass =
  | 'none'
  | 'math'
  | 'informatics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'english'
  | 'literature'
  | 'history'
  | 'geography'
  | 'normal'

export default interface IUser {
  id: string
  fullName: string
  username: string
  birthdate?: Date
  sex?: 'male' | 'female'
  class?: IClass
  schoolYear?: number
  type?: 'boarding' | 'semi-boarding' | 'outpatient'
  room?: string
}
