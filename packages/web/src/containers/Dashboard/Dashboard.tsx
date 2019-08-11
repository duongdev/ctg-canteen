import React, { FC, useState } from 'react'

import { makeStyles } from '@material-ui/core'
import CreateUser from 'containers/CreateUser/CreateUser'
import UserList from 'containers/UserList'
import { Route, Switch } from 'react-router-dom'
import DashboardAppBar from './components/DashboardAppBar'
import DashboardDrawer from './components/DashboardDrawer'

const DRAWER_WIDTH = 250

const Dashboard: FC = (props) => {
  const classes = useStyles(props)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <DashboardDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{ paper: classes.drawerPaper }}
      />
      <div className={classes.content}>
        <DashboardAppBar onOpenDrawer={() => setDrawerOpen(true)} />

        <Switch>
          <Route path="/dashboard/users" exact component={UserList} />
          <Route path="/dashboard/users/create" component={CreateUser} />
        </Switch>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    [breakpoints.up('md')]: {
      marginLeft: DRAWER_WIDTH,
    },
  },
}))

export default Dashboard
