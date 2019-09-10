import { GraphQLResolveInfo } from 'graphql'
import { IUser, UserRole } from 'models/User'
import yup from 'yup'

export type ResolverFn<
  ReturnedValue = any,
  Args = any,
  Context = BaseContext,
  RootValue = any
> = (
  rootValue: RootValue,
  args: Args,
  ctx: Context,
  info: GraphQLResolveInfo,
) => ReturnedValue | Promise<ReturnedValue>

export type ResolverOptions<ReturnedValue, Args, Context, RootValue> = {
  resolve: ResolverFn<ReturnedValue, Args, Context, RootValue>
  /** yup validation schema for params. */
  paramsValidationSchema?: yup.MixedSchema<Args>
  /** Do you want to use some hooks? */
  use?: {
    hasRole?: UserRole
    /** Throws "unauthorized" error if ctx.user is empty. */
    isUser?: boolean
    notDeactivate?: boolean
  }
}

export type BaseContext = {
  user?: IUser
}

const isUser = <RootValue, Args>(
  _parent: RootValue,
  _args: Args,
  ctx: BaseContext,
  _info: GraphQLResolveInfo,
) => {
  if (!ctx.user) throw new Error('unauthorized')
}

const hasRole = <RootValue, Args>(
  parent: RootValue,
  args: Args,
  ctx: BaseContext,
  info: GraphQLResolveInfo,
) => (role: UserRole) => {
  isUser(parent, args, ctx, info)
  if (
    !ctx.user.roles ||
    ctx.user.roles.includes('deactivated') ||
    !ctx.user.roles.includes(role)
  ) {
    throw new Error('permission_denied')
  }

  return
}

const notDeactivate = <RootValue, Args>(
  parent: RootValue,
  args: Args,
  ctx: BaseContext,
  info: GraphQLResolveInfo,
) => () => {
  isUser(parent, args, ctx, info)
  if (ctx.user.roles.includes('deactivated')) {
    throw new Error('permission_denied')
  }

  return
}

export const createResolver = <
  ReturnedValue = any,
  Args = any,
  Context = BaseContext,
  RootValue = any
>(
  opts: ResolverOptions<ReturnedValue, Args, Context, RootValue>,
) => (
  parent: RootValue,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const { paramsValidationSchema, resolve, use } = opts

  if (use) {
    if (use.isUser) isUser(parent, args, context, info)

    if (use.hasRole) {
      hasRole(parent, args, context, info)(use.hasRole)
    }

    if (use.notDeactivate) {
      notDeactivate(parent, args, context, info)()
    }
  }

  const validatedArgs = paramsValidationSchema
    ? paramsValidationSchema.validateSync(args)
    : args

  return resolve(parent, validatedArgs, context, info)
}
