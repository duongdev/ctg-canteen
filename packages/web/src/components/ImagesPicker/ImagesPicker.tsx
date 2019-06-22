import React, { useCallback, useEffect, useState } from 'react'

import { Grid, makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { ImagePlus } from 'mdi-material-ui'
import { useDropzone } from 'react-dropzone'

type ImagesPickerProps = {
  className?: string
  onChange: (files: File[]) => void
}

const ImagesPicker: React.FC<ImagesPickerProps> = (props) => {
  const classes = useStyles(props)
  const [files, setFiles] = useState<File[]>([])
  const [previewURLs, setPreviewURLs] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: ['image/jpeg', 'image/png'],
    maxSize: 5120000, // 5 MB
  })

  useEffect(() => {
    props.onChange(files)
    setPreviewURLs(files.map((file) => URL.createObjectURL(file)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  useEffect(() => {
    return previewURLs.forEach((url) => URL.revokeObjectURL(url))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={clsx(classes.root, props.className)} {...getRootProps()}>
        <input {...getInputProps()} />
        {files.length ? (
          <Grid container spacing={1}>
            {previewURLs.map((url, idx) => (
              <Grid item key={idx}>
                <div
                  className={classes.imageItem}
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                />
              </Grid>
            ))}
            <Grid item>
              <AddImageBox
                onClick={open}
                className={clsx(classes.imageItem, classes.addImageBox)}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                Kéo và thả hình ảnh vào đây
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="button" color="textSecondary">
                hoặc
              </Typography>
            </Grid>
            <Grid item>
              <AddImageBox
                onClick={open}
                className={clsx(classes.imageItem, classes.addImageBox)}
              />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  )
}

const AddImageBox = (props: {
  className: string
  onClick: (e: any) => void
}) => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justify="center"
    className={props.className}
    onClick={props.onClick}
  >
    <Grid item>
      <ImagePlus fontSize="large" color="inherit" />
    </Grid>
    <Grid item>
      <Typography variant="caption" color="inherit">
        Chọn ảnh
      </Typography>
    </Grid>
  </Grid>
)

const useStyles = makeStyles(({ palette, shape, shadows }) => ({
  root: { minHeight: 214 },
  imageItem: {
    height: 100,
    width: 100,
    borderRadius: shape.borderRadius / 2,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: shadows[1],
  },
  addImageBox: {
    border: `dashed 1px ${palette.divider}`,
    cursor: 'pointer',
    color: palette.text.secondary,
    boxShadow: 'none',
  },
}))

export default ImagesPicker
