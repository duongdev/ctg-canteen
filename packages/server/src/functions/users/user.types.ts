import { IUser } from 'models/User'

type UserInput = {
  name: IUser['name']
  checkerId?: IUser['checkerId']
  birthdate: IUser['birthdate']
  hometown: IUser['hometown']
  sex: IUser['sex']
  class: IUser['class']
  schoolYear: IUser['schoolYear']
  group: IUser['group']
  boardingRoom: IUser['boardingRoom']
  roles?: IUser['roles']
  password?: IUser['password']
}

export type CreateUserInput = UserInput &
  RequireAtLeastOne<
    {
      studentId?: IUser['studentId']
      username?: IUser['username']
    },
    'studentId' | 'username'
  >

export type CreateStudentInput = UserInput & {
  studentId: IUser['studentId']
  username?: IUser['username']
}
