import { merge } from 'lodash'

import userResolvers from './functions/users/user-resolvers'

export default merge(
  {
    Query: {
      _empty: () => 'Hello world!',
    },
  },
  userResolvers,
)
