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
  mutation ImportUsers($file: Upload!){
    importUsers: importStudents(file: $file) {
      importedUsers: importedStudents {
        ...UserFragment
      }
      notImportedUsers: notImportedStudents {
        user: student {
          ...UserFragment
        }
        reason
      }
    }
  }
  ${USER_FRAGMENT}
`
