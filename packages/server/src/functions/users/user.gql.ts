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
    createdAt: DateTime
    updatedAt: DateTime
    createdByUserId: String
    createdByUser: User
  }

  extend type Query {
    authenticate: User
  }

  type UserWithoutID {
    username: String!
    name: String
    checkerId: String
    birthdate: String
    hometown: String
    sex: String
    class: String
    schoolYear: String
    group: String
    boardingRoom: String
    roles: [String]
  }

  type NotImportedUser {
    user: UserWithoutID
    reason: String
  }

  type ImportUserList {
    importedUsers: [User]
    notImportedUsers: [NotImportedUser]
    overriddenCheckerIdUsers: [User]
  }

  extend type Mutation {
    signIn(username: String!, password: String!): String
    importUsers(file: Upload!, overrideCheckerIds: Boolean): ImportUserList
  }
`
