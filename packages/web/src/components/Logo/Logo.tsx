import React from 'react'

import { makeStyles, Typography } from '@material-ui/core'

type LogoProps = {}

const Logo: React.FC<LogoProps> = (props) => {
  const classes = useStyles(props)

  return (
    <>
      <Typography variant="h4" color="primary">
        <strong>
          <span className={classes.kLetter}>K</span>
          ant¡n
        </strong>
      </Typography>
    </>
  )
}

const useStyles = makeStyles(({ palette, spacing, shape }) => ({
  kLetter: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main,
    borderRadius: shape.borderRadius,
    marginRight: spacing(0.5),
    height: 40,
    width: 40,
  },
}))

export default Logo
