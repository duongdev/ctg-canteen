import React, { FC } from 'react'

import Dashboard from 'containers/Dashboard'
import SignIn from 'containers/SignIn'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sign-in" component={SignIn} />
        <Redirect to="/sign-in" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
