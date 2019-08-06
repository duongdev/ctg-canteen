import React, { FC } from 'react'

import { Box, Container } from '@material-ui/core'
import useIsMobile from 'hooks/useIsMobile'

const ContentContainer: FC = (props) => {
  const isMobile = useIsMobile()

  return (
    <Container maxWidth="md">
      <Box paddingY={isMobile ? 4 : 8}>{props.children}</Box>
    </Container>
  )
}

export default ContentContainer
