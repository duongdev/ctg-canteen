import React from 'react'

import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import colors from 'constants/constants'
import numeral from 'numeral'
import { useDropzone } from 'react-dropzone'

type UserImportDropzoneProps = {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

const UserImportDropzone: React.FC<UserImportDropzoneProps> = (props) => {
  const classes = useStyles()
  const { file, setFile } = props

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    // Do something with the files
  }, [setFile])
  const onClear = React.useCallback(() => setFile(null), [setFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  if (file) {
    return (
      <div className={classes.selectedFile}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6">
              {file.name} ({numeral(file.size).format('0.0 b')} bytes)
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant="contained" color="secondary" onClick={onClear}>
              Bỏ chọn
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <Paper className={classes.root} {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography variant="h6" color="textSecondary">
        {isDragActive
          ? 'Thả file vào đây'
          : 'Kéo và thả file excel (xls hoặc xlsx) vào đây  hoặc click để chọn file từ máy tính'}
      </Typography>
    </Paper>
  )
}

const useStyles = makeStyles(({ spacing, shape }) => ({
  root: {
    padding: spacing(2),
    height: 150,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFile: {
    padding: spacing(1, 2),
    backgroundColor: colors['G5'],
    borderRadius: shape.borderRadius,
  },
}))

export default UserImportDropzone
