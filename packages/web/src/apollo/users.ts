import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  CreateUserData,
  CreateUserVariables,
  IUser,
  NotImportedUser,
} from 'typings'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    name
    birthdate
    hometown
    sex
    schoolYear
    group
    boardingRoom
    class
    roles
    checkerId
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!, $options: CreateUserOptions) {
    createUser(input: $input, options: $options) {
      createdUser {
        ...UserFragment
      }
      overriddenCheckerIdUser {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`

export const useCreateUserMutation = () =>
  useMutation<CreateUserData, CreateUserVariables>(CREATE_USER)

export const IMPORT_USERS = gql`
  mutation ImportUsers($file: Upload!, $overrideCheckerIds: Boolean) {
    importUsers(file: $file, overrideCheckerIds: $overrideCheckerIds) {
      importedUsers {
        id
        username
      }
      notImportedUsers {
        user {
          username
          checkerId
        }
        reason
      }
    }
  }
`

export const useImportUserMutation = () =>
  useMutation<{
    importUsers: {
      importedUsers: IUser[]
      notImportedUsers: NotImportedUser[]
    }
  }>(IMPORT_USERS)

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`

export const AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
