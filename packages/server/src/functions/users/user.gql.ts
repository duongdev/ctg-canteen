import { gql } from 'apollo-server'

export default gql`
  type UserChecker {
    id: ID!
    name: String
    card: String
  }

  type User {
    id: ID!
    studentId: String!
    name: String!
    birthday: DateTime
    hometown: String!
    sex: String!
    schoolYear: Int!
    group: String!
    boardingRoom: String
    class: String
    roles: [String]
    checker: UserChecker
  }

  extend type Query {
    authenticate: User
  }

  extend type Mutation {
    signIn(username: String!, password: String!): String
  }
`
