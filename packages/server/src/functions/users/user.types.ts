import { IUser } from 'models/User'
import { tuple } from 'utils/tuple'

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

export type CreateUserOptions = {
  overrideCheckerId?: boolean
}

export type CreateUsersOptions = {
  overrideCheckerIds?: boolean
}

export const GET_USERS_SORT_BY = tuple(['createdAt', 'reverse_createdAt'])

export type GetUsersSortBy = typeof GET_USERS_SORT_BY[number]

export type GetUsersFilter = {
  limit?: number
  page?: number
  sortBy?: GetUsersSortBy
}

export type GetUsersOutput = {
  total: number
  page: number
  pages: number
  limit: number
  edges: IUser[]
}
