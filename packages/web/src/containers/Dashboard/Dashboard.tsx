import React, { FC, useCallback, useState } from 'react'

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

  const handleOpen = useCallback(() => setDrawerOpen(true), [])
  const handleClose = useCallback(() => setDrawerOpen(false), [])

  return (
    <>
      <DashboardDrawer
        open={drawerOpen}
        onClose={handleClose}
        classes={{ paper: classes.drawerPaper }}
      />
      <div className={classes.content}>
        <DashboardAppBar onOpenDrawer={handleOpen} />

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
