import { gql } from 'apollo-server'

export default gql`
  type User {
    id: ID!
    studentId: String!
    name: String!
    birthdate: DateTime
    hometown: String!
    sex: String!
    schoolYear: Int!
    group: String!
    boardingRoom: String
    class: String
    roles: [String]
    checkerId: String
  }

  extend type Query {
    authenticate: User
  }

  extend type Mutation {
    signIn(username: String!, password: String!): String
  }
`
