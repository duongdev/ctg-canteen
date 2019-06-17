import React from 'react'

import { useTheme } from '@material-ui/core'
import ReactUndraw, { UndrawProps } from 'react-undraw'

const Undraw: React.FC<UndrawProps> = (props) => {
  const theme = useTheme()
  return <ReactUndraw primaryColor={theme.palette.primary.main} {...props} />
}

export default Undraw
