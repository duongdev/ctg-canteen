import React from 'react'

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core'
import ContentContainer from 'components/shared/ContentContainer'
import PageTitle from 'components/shared/PageTitle'
import { FileExcel, Upload } from 'mdi-material-ui'

type ImportUsersProps = {}

const ImportUsers: React.FC<ImportUsersProps> = () => {
  return (
    <ContentContainer maxWidth="sm">
      <PageTitle title="Import người dùng" />

      <Grid container spacing={2} direction="column">
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Button variant="outlined" color="primary">
                <Box component={FileExcel} marginRight={1} /> Chọn file...
              </Button>
            </Grid>
            <Grid item>
              <Typography>Chưa chọn file</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <FormControlLabel
            control={<Checkbox value="override" />}
            label="Ghi đè mã máy chấm công"
          />
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary">
            <Box component={Upload} marginRight={1} />
            Tải lên
          </Button>
        </Grid>
      </Grid>
    </ContentContainer>
  )
}

export default ImportUsers
