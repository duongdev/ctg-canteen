import React, { useCallback, useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { IMPORT_USERS } from 'apollo/users.gql'
import ContentContainer from 'components/shared/ContentContainer'
import PageTitle from 'components/shared/PageTitle'
import { FileExcel, Upload } from 'mdi-material-ui'
import numeral from 'numeral'
import { useDropzone } from 'react-dropzone'
import { Link } from 'react-router-dom'
import IUser from 'typings/User'

type ImportUsersProps = {}

const ImportUsers: React.FC<ImportUsersProps> = (props) => {
  // const loading = true

  const classes = useStyles(props)
  const [file, setFile] = useState<File | null>(null)
  const [upload, { data, error, loading }] = useMutation<{
    importUsers: { importedUsers: IUser[] }
  }>(IMPORT_USERS)
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

  const handleUpload = useCallback(async () => {
    await upload({ variables: { file } })
    setFile(null)
  }, [file, upload])

  return (
    <ContentContainer maxWidth="sm">
      <PageTitle title="Import người dùng" />

      <Grid container spacing={2} direction="column">
        <Grid item>
          <Grid container spacing={4} alignItems="center">
            <input {...getInputProps()} />
            <Grid item>
              <Button
                disabled={loading}
                variant="outlined"
                color="primary"
                onClick={handleOpen}
              >
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
            control={<Checkbox disabled={loading} value="override" />}
            label="Ghi đè mã máy chấm công"
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            <Box component={Upload} marginRight={1} />
            {loading ? 'Đang xử lý' : 'Tải lên'}
          </Button>
        </Grid>

        <Grid item>
          <Grid container spacing={1} direction="column">
            <Grid item>{loading && <LinearProgress />}</Grid>
            {data &&
              data.importUsers &&
              data.importUsers.importedUsers &&
              data.importUsers.importedUsers.length && (
                <Grid item>
                  <Typography className={classes.success}>
                    Đã tạo thành công{' '}
                    <strong>{data.importUsers.importedUsers.length}</strong>{' '}
                    người dùng.{' '}
                    <Link to="/dashboard/users">
                      <strong>[Xem danh sách]</strong>
                    </Link>
                  </Typography>
                </Grid>
              )}
            {error &&
              error.graphQLErrors &&
              error.graphQLErrors.length &&
              error.graphQLErrors.map((graphQLError, idx) => (
                <Grid item key={idx}>
                  <div className={classes.graphQLError}>
                    <Typography color="error">
                      {graphQLError.message}
                    </Typography>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </ContentContainer>
  )
}

const useStyles = makeStyles(({ spacing, palette, shape }) => ({
  graphQLError: {
    padding: spacing(1, 2),
    backgroundColor: '#e573730f',
    border: `solid 1px ${palette.error.dark}`,
    borderRadius: shape.borderRadius,
  },
  success: {
    padding: spacing(1, 2),
    backgroundColor: green.A100,
    color: green[700],
    border: `solid 1px ${green[700]}`,
    borderRadius: shape.borderRadius,
  },
}))

export default ImportUsers
