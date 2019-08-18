import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import { Cookies } from 'react-cookie'

const GRAPHQL_SERVER = process.env.REACT_APP_SERVER_URI

const cookies = new Cookies()

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = cookies.get('access_token')
  // return the headers to the context so httpLink can read them

  if (token) {
    return {
      headers: {
        ...headers,
        'x-access-token': token,
      },
    }
  }

  return headers
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    authLink,
    createUploadLink({
      uri: GRAPHQL_SERVER,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
})

export default client
