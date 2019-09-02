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

export type IUserGroup =
  | 'boarding'
  | 'outpatient'
  | 'semi-boarding'
  | 'teacher'
  | 'other'

export type IUserRole = 'admin' | 'student' | 'deactivated'

export default interface IUser {
  id: string
  name: string
  username: string
  birthdate?: Date
  hometown?: string
  sex?: 'male' | 'female'
  class?: IClass
  schoolYear?: number
  group: IUserGroup
  roles: IUserRole[]
  checkerId?: string
  boardingRoom?: string
}
