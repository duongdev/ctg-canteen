import { merge } from 'lodash'

import dishResolvers from 'functions/dishes/dish.resolvers'
import userResolvers from 'functions/users/user.resolvers'

export default merge(
  {
    Query: {
      _empty: () => 'Hello world!',
    },
  },
  dishResolvers,
  userResolvers,
)
