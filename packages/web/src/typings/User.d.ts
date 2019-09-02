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

export interface IUser {
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

export type CreateUserData = {
  createUser: {
    createdUser: IUser
    overriddenCheckerIdUser: IUser
  }
}

export type CreateUpdateUserValues = {
  name: IUser['name']
  username: IUser['username']
  password: string | null
  checkerId: string
  birthdate: string
  hometown: IUser['hometown']
  sex: IUser['sex']
  class: IUser['class']
  schoolYear: IUser['schoolYear'] | null
  group: IUser['group']
  boardingRoom: IUser['boardingRoom']
}

export type CreateUserVariables = {
  input: CreateUpdateUserValues
  options: {
    overrideCheckerId?: boolean
    generatePasswordFromUsername?: boolean
  }
}
