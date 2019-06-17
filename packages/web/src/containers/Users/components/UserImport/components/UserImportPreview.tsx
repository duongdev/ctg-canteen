import React from 'react'

import { Box, Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import Toolbar from 'components/material-table/Toolbar'
import MaterialTable from 'material-table'
import { CloudUploadOutline, Magnify } from 'mdi-material-ui'

type UserImportPreviewProps = {
  data: any[]
}

const UserImportPreview: React.FC<UserImportPreviewProps> = (props) => {
  return (
    <MaterialTable
      data={props.data}
      columns={[
        {
          title: 'Mã số',
          field: 'checker_code',
          type: 'numeric',
          cellStyle: { width: 120 },
        },
        {
          title: 'Họ & tên',
          field: 'name',
        },
        {
          title: 'Mã chấm công',
          field: 'checker_name',
        },
      ]}
      options={{
        pageSizeOptions: [25, 50, 100, 150],
        pageSize: 25,
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
              <Grid item>
                <Button variant="contained" color="primary">
                  <Box component={CloudUploadOutline} marginRight={1} /> Tải lên
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        ),
      }}
      style={{ overflow: 'hidden' }}
    />
  )
}

export default UserImportPreview
