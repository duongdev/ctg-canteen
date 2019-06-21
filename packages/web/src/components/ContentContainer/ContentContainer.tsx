import React from 'react'

import { Container, makeStyles } from '@material-ui/core'
import { ContainerProps } from '@material-ui/core/Container'

type ContentContainerProps = {
  maxWidth?: ContainerProps['maxWidth']
}

const ContentContainer: React.FC<ContentContainerProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Container maxWidth={props.maxWidth || 'md'} className={classes.root}>
      {props.children}
    </Container>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    marginTop: spacing(8),
    marginBottom: spacing(8),
  },
}))

export default ContentContainer
