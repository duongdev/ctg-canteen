import React from 'react'

import { makeStyles } from '@material-ui/core'
import Helmet from 'components/Helmet'
import { APP_NAME } from 'constants/global'
import { DRAWER_WIDTH } from 'constants/layout'
import Dishes from 'containers/Dishes'
import Users from 'containers/Users'
import { Route, Switch } from 'react-router'
import DrawerNav from './components/DrawerNav'

type AppProps = {}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles(props)

  return (
    <>
      <Helmet titleTemplate={`%s | ${APP_NAME}`} />
      <DrawerNav />
      <div className={classes.content}>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/dishes" component={Dishes} />
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
