import { getUsers } from 'functions/users/user.services'
import { GetUsersFilter, GetUsersOutput } from 'functions/users/user.types'
import { createResolver } from 'helpers/resolvers'

export const authenticate = async (_, args, ctx) => {
  return ctx.user
}

export const users = createResolver<GetUsersOutput, { input: GetUsersFilter }>({
  use: {
    hasRole: 'admin',
  },
  resolve: async (_, args, context) => {
    const users = await getUsers(args.input)

    return users
  },
})
