import { IUser } from 'models/User'

export type ImportUserList = {
  studentId: IUser['studentId']
  name: IUser['name']
  checkerId?: IUser['checkerId']
  birthday: IUser['birthday']
  hometown: IUser['hometown']
  sex: IUser['sex']
  class: IUser['class']
  schoolYear: IUser['schoolYear']
  group: IUser['group']
  boardingRoom: IUser['boardingRoom']
}
