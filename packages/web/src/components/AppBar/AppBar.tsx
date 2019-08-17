import React, { FC } from 'react'

import {
  AppBar as MUIAppBar,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import AppBarUser from 'components/AppBarUser';
import useIsMobile from 'hooks/useIsMobile'
import { Menu } from 'mdi-material-ui'

export type AppBarProps = {
  onOpenDrawer: () => void
}

const AppBar: FC<AppBarProps> = (props) => {
  const classes = useStyles(props)
  const isMobile = useIsMobile()

  return (
    <MUIAppBar color="inherit" elevation={1} position="sticky">
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                onClick={props.onOpenDrawer}
                className={classes.menuButton}
                size={isMobile ? 'small' : 'medium'}
              >
                <Menu />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs />

          <Grid item>
            <AppBarUser />
          </Grid>
        </Grid>
      </Toolbar>
    </MUIAppBar>
  )
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  menuButton: {
    [breakpoints.down('xs')]: {
      marginLeft: 0,
    },
    marginLeft: -spacing(2),
    marginRight: spacing(1),
  },
}))

export default AppBar
