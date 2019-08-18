import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'

const GRAPHQL_SERVER = 'http://localhost:4000'

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
    createUploadLink({
      uri: GRAPHQL_SERVER,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
})

export default client
