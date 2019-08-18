import React, { FC, useCallback, useState } from 'react'

import { makeStyles } from '@material-ui/core'
import AppBar from 'components/AppBar'
import CreateUser from 'components/CreateUser'
import Drawer from 'components/Drawer';
import ImportUsers from 'components/ImportUsers';
import UserList from 'components/UserList'
import { Route, Switch } from 'react-router-dom'

const DRAWER_WIDTH = 250

const Dashboard: FC = (props) => {
  const classes = useStyles(props)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleOpen = useCallback(() => setDrawerOpen(true), [])
  const handleClose = useCallback(() => setDrawerOpen(false), [])

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={handleClose}
        classes={{ paper: classes.drawerPaper }}
      />
      <div className={classes.content}>
        <AppBar onOpenDrawer={handleOpen} />

        <Switch>
          <Route path="/dashboard/users" exact component={UserList} />
          <Route path="/dashboard/users/create" component={CreateUser} />
          <Route path="/dashboard/users/import" component={ImportUsers} />
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
