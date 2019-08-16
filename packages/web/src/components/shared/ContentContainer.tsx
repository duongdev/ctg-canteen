import React, { FC } from 'react'

import { Box, Container } from '@material-ui/core'
import { ContainerProps } from '@material-ui/core/Container'
import useIsMobile from 'hooks/useIsMobile'

const ContentContainer: FC<ContainerProps> = (props) => {
  const isMobile = useIsMobile()

  return (
    <Container maxWidth="md" {...props}>
      <Box paddingY={isMobile ? 4 : 8}>{props.children}</Box>
    </Container>
  )
}

export default ContentContainer
