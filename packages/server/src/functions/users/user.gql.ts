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

  input UsersInput {
    limit: Int
    page: Int
    sortBy: String
  }

  type UserPagination {
    total: Int
    page: Int
    pages: Int
    limit: Int
    edges: [User]
  }

  extend type Query {
    authenticate: User
    users(input: UsersInput): UserPagination
  }

  type UserWithoutID {
    username: String!
    name: String
    checkerId: String
    birthdate: String
    hometown: String
    sex: String
    class: String
    schoolYear: Int
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

  type CreateUserResult {
    createdUser: User
    overriddenCheckerIdUser: User
  }

  input CreateUserInput {
    username: String!
    name: String!
    checkerId: String
    birthdate: DateTime
    hometown: String
    sex: String
    class: String
    schoolYear: Int
    group: String
    boardingRoom: String
    password: String
  }

  input CreateUserOptions {
    overrideCheckerId: Boolean
    generatePasswordFromUsername: Boolean
  }

  extend type Mutation {
    signIn(username: String!, password: String!): String
    createUser(
      input: CreateUserInput!
      options: CreateUserOptions
    ): CreateUserResult
    importUsers(file: Upload!, overrideCheckerIds: Boolean): ImportUserList
  }
`
