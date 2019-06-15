import React from 'react'

import { makeStyles } from '@material-ui/core'
import { DRAWER_WIDTH } from 'constants/layout'
import Users from 'containers/Users'
import { Route, Switch } from 'react-router'
import DrawerNav from './components/DrawerNav'

type AppProps = {}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles(props)

  return (
    <>
      <DrawerNav />
      <div className={classes.content}>
        <Switch>
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  content: {
    marginLeft: DRAWER_WIDTH,
  },
}))

export default App
