import { useCallback, useMemo } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { AUTHENTICATE, useSignInMutation } from 'apollo/users'
import createUseContext from 'constate'
import { useCookies } from 'react-cookie'
import { IUser } from 'typings'

const useAuthHook = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['access_token'])

  const { data } = useQuery<{ authenticate: IUser }>(AUTHENTICATE, {
    skip: !cookies['access_token'],
  })
  const [signInMutation, { loading, error }] = useSignInMutation()

  const user = useMemo(() => data && data.authenticate, [data])

  const handleSignInFailure = useCallback(() => {}, [])

  const signIn = useCallback(
    async (variables: { username: string; password: string }) => {
      const { data } = await signInMutation({ variables })
      const token = data && data.signIn

      if (!token) {
        return handleSignInFailure()
      }

      setCookies('access_token', token, {
        path: '/',
      })
    },
    [handleSignInFailure, setCookies, signInMutation],
  )

  const signOut = useCallback(async () => {
    removeCookie('access_token', { path: '/' })
    window.location.reload()
  }, [removeCookie])

  return { user, signOut, signIn: { signIn, loading, error } }
}

const useAuth = createUseContext(useAuthHook)

export const UseAuthProvider = useAuth.Provider
export default useAuth
