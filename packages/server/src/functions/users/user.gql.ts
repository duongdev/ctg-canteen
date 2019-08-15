import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    username: String!
    name: String!
    birthdate: DateTime
    hometown: String
    sex: String
    schoolYear: Int
    group: String
    boardingRoom: String
    class: String
    roles: [String]
    checkerId: String
  }

  extend type Query {
    authenticate: User
  }

  type NotImportedStudent {
    student: User
    reason: String
  }

  type ImportStudentList {
    importedStudents: [User]
    notImportedStudents: [NotImportedStudent]
  }

  extend type Mutation {
    signIn(username: String!, password: String!): String
    importStudents(file: Upload!): ImportStudentList
  }
`
