import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from 'containers/App'
import SignIn from 'containers/auth/SignIn'

type RouterProps = {}

const Router: React.FC<RouterProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
