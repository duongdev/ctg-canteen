import React, { ReactNode } from 'react'

import { Box, Grid, Paper, Typography } from '@material-ui/core'

type SectionProps = {
  title: string | ReactNode
}

const Section: React.FC<SectionProps> = (props) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {typeof props.title === 'string' ? (
          <Typography variant="h5">{props.title}</Typography>
        ) : (
          props.title
        )}
      </Grid>
      <Grid item>
        <Box component={Paper} padding={2}>
          {props.children}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Section
