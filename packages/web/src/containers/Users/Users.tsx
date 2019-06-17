import React from 'react'

import { makeStyles, Tab, Tabs, Toolbar, Typography } from '@material-ui/core'
import Helmet from 'components/Helmet'
import { Route, Switch } from 'react-router'
import useRouter from 'use-react-router'
import UserImport from './components/UserImport'
import UserList from './components/UserList'

type UsersProps = {}

const Users: React.FC<UsersProps> = () => {
  const classes = useStyles()
  const { location, history } = useRouter()

  const handleTabNavigate = React.useCallback(
    (e, path: string) => history.push(path),
    [history],
  )

  return (
    <>
      <Helmet title="Quản lý người dùng" />
      <div className={classes.header}>
        <Toolbar>
          <Typography variant="h5">Quản lý người dùng</Typography>
        </Toolbar>
        <Tabs value={location.pathname} onChange={handleTabNavigate}>
          <Tab value="/users" label="Danh sách" />
          <Tab value="/users/import" label="Import" />
        </Tabs>
      </div>

      <Switch>
        <Route path="/users/import" component={UserImport} />
        <Route path="/users" component={UserList} />
      </Switch>
    </>
  )
}

const useStyles = makeStyles(({ palette, spacing }) => ({
  header: {
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    paddingTop: spacing(6),
  },
}))

export default Users
