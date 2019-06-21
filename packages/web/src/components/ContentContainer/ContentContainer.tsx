import React from 'react'

import { Container, makeStyles } from '@material-ui/core'

type ContentContainerProps = {}

const ContentContainer: React.FC<ContentContainerProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Container maxWidth="md" className={classes.root}>
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
