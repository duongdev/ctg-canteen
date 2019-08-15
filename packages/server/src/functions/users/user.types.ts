import { IUser } from 'models/User'

export type CreateUserInput = {
  username: IUser['username']
  name: IUser['name']
  checkerId?: IUser['checkerId']
  birthdate: string
  hometown: IUser['hometown']
  sex: IUser['sex']
  class: IUser['class']
  schoolYear: IUser['schoolYear']
  group: IUser['group']
  boardingRoom: IUser['boardingRoom']
  roles?: IUser['roles']
  password?: IUser['password']
}
