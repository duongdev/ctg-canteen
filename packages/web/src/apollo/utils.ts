import { ApolloError } from 'apollo-client'

export const getGraphQLErrors = (error?: ApolloError) => {
  if (!(error && error.graphQLErrors && error.graphQLErrors.length)) return null
  return error.graphQLErrors
}
