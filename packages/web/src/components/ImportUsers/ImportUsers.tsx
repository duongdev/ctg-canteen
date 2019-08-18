import React, { useCallback, useState } from 'react'

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
import numeral from 'numeral'
import { useDropzone } from 'react-dropzone'

type ImportUsersProps = {}

const ImportUsers: React.FC<ImportUsersProps> = () => {
  const [file, setFile] = useState<File | null>(null)
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setFile(acceptedFiles[0])
    },
    [setFile],
  )
  const { getInputProps, open } = useDropzone({
    onDrop,
    noDrag: true,
    multiple: false,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const handleOpen = useCallback(() => {
    setTimeout(open, 500)
  }, [open])

  const handleUpload = useCallback(() => {
    console.log('handleUpload', file)
  }, [file])

  return (
    <ContentContainer maxWidth="sm">
      <PageTitle title="Import người dùng" />

      <Grid container spacing={2} direction="column">
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            <input {...getInputProps()} />
            <Grid item>
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                <Box component={FileExcel} marginRight={1} /> Chọn file...
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                {file
                  ? `${file.name} (${numeral(file.size).format('0.0 b')})`
                  : 'Chưa chọn file'}
              </Typography>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file}
          >
            <Box component={Upload} marginRight={1} />
            Tải lên
          </Button>
        </Grid>
      </Grid>
    </ContentContainer>
  )
}

export default ImportUsers
