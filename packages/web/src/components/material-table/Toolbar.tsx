import React from 'react'

import { Box, Toolbar as MUIToolbar } from '@material-ui/core'

type ToolbarProps = {}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return (
    <Box component={MUIToolbar} bgcolor="background.default" pt={0.5} pb={0.75}>
      {props.children}
    </Box>
  )
}

export default Toolbar
