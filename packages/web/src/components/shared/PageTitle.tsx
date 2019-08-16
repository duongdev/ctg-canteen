import React, { FC } from 'react'

import { Hidden, makeStyles, Typography } from '@material-ui/core'
import Helmet from 'react-helmet'

export type PageTitleProps = {
  title: string
}

const PageTitle: FC<PageTitleProps> = (props) => {
  const classes = useStyles(props)

  return (
    <>
      <Helmet title={props.title} defer />
      <div className={classes.root}>
        <Hidden xsDown>
          <Typography variant="h4">{props.title}</Typography>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h5">{props.title}</Typography>
        </Hidden>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginBottom: spacing(4),
  },
}))

export default PageTitle
