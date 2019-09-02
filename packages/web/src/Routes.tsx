import React, { FC } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { CircularProgress } from '@material-ui/core'
import { AUTHENTICATE } from 'apollo/users'
import Dashboard from 'components/Dashboard'
import SignIn from 'components/SignIn'
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'
import IUser from 'typings/User'

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={withAuth(Dashboard)} />
        <Route path="/sign-in" component={SignIn} />
        <Redirect to="/dashboard" />
      </Switch>
    </BrowserRouter>
  )
}

const withAuth = (BaseComponent: React.ComponentType<RouteComponentProps>) => (
  props: RouteComponentProps,
) => {
  const { loading, data } = useQuery<{ authenticate: IUser }>(AUTHENTICATE, {
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  if (data && data.authenticate) {
    return <BaseComponent {...props} />
  }

  return (
    <Redirect
      to={{
        pathname: '/sign-in',
        state: {
          from: props.location,
        },
      }}
    />
  )
}

export default Routes
