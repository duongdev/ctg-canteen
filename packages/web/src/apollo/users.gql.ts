import gql from 'graphql-tag'

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
