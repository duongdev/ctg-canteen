import React from 'react'

import {
  Container,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core'
import Toolbar from 'components/material-table/Toolbar'
import MaterialTable from 'material-table'
import { Magnify } from 'mdi-material-ui'

const users = [
  {
    id: 1,
    name: 'Đỗ Cao Thượng Dương',
    group: 'Nội trú',
    class: '10 Sinh',
    code: '2821',
  },
]

type UserListProps = {}

const UserList: React.FC<UserListProps> = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.container}>
      <MaterialTable
        title=""
        columns={[
          {
            title: 'Mã số',
            field: 'code',
            type: 'numeric',
            cellStyle: { width: 120 },
          },
          { title: 'Họ & tên', field: 'name' },
          { title: 'Nhóm', field: 'group' },
          { title: 'Lớp', field: 'class' },
        ]}
        data={users}
        options={{
          sorting: false,
        }}
        components={{
          Toolbar: () => (
            <Toolbar>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs sm={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder="Nhập mã số hoặc tên..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Magnify color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs />
              </Grid>
            </Toolbar>
          ),
        }}
        style={{ overflow: 'hidden' }}
      />
    </Container>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: spacing(8),
    marginBottom: spacing(8),
  },
}))

export default UserList
