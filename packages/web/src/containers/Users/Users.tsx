import React from 'react'

import { Tab, Tabs } from '@material-ui/core'
import PageHeader from 'components/PageHeader'
import { Route, Switch } from 'react-router'
import useRouter from 'use-react-router'
import UserImport from './components/UserImport'
import UserList from './components/UserList'

type UsersProps = {}

const Users: React.FC<UsersProps> = () => {
  const { location, history } = useRouter()

  const handleTabNavigate = React.useCallback(
    (e, path: string) => history.push(path),
    [history],
  )

  return (
    <>
      <PageHeader
        withHelmet
        title="Quản lý người dùng"
        tabs={
          <Tabs value={location.pathname} onChange={handleTabNavigate}>
            <Tab value="/users" label="Danh sách" />
            <Tab value="/users/import" label="Import" />
          </Tabs>
        }
      />

      <Switch>
        <Route path="/users/import" component={UserImport} />
        <Route path="/users" component={UserList} />
      </Switch>
    </>
  )
}

export default Users
