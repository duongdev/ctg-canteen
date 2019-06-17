import React from 'react'

import { makeStyles, Toolbar as MUIToolbar } from '@material-ui/core'

type ToolbarProps = {}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const classes = useStyles(props)
  return <MUIToolbar className={classes.root}>{props.children}</MUIToolbar>
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    padding: spacing(0.25, 2, 0.5, 2),
    backgroundColor: palette.background.default,
  },
}))

export default Toolbar
