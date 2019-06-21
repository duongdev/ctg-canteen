import React, { ReactNode } from 'react'

import { makeStyles, Toolbar, Typography } from '@material-ui/core'
import Helmet from 'components/Helmet'

type PageHeaderProps = {
  title: string
  withHelmet?: boolean
  tabs?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const classes = useStyles(props)
  return (
    <>
      {props.withHelmet && <Helmet title={props.title} />}
      <div className={classes.header}>
        <Toolbar>
          <Typography variant="h5">{props.title}</Typography>
        </Toolbar>
        {props.tabs}
      </div>
    </>
  )
}

const useStyles = makeStyles(({ palette, spacing }) => ({
  header: {
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    paddingTop: spacing(6),
  },
}))

export default PageHeader
