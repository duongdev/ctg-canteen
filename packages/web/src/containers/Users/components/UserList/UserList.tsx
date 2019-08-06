import React from 'react'

import { Grid, InputAdornment, TextField } from '@material-ui/core'
import ContentContainer from 'components/ContentContainer'
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
  return (
    <ContentContainer>
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
    </ContentContainer>
  )
}

export default UserList