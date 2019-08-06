import React, { FC } from 'react'

import Dashboard from 'containers/Dashboard'
import SignIn from 'containers/SignIn'
import { BrowserRouter, Route } from 'react-router-dom'

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sign-in" component={SignIn} />
    </BrowserRouter>
  )
}

export default Routes
