import React, { FC } from 'react'

import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import useIsMobile from 'hooks/useIsMobile'
import { Menu } from 'mdi-material-ui'
import UserMenu from './UserMenu'

export type DashboardAppBarProps = {
  onOpenDrawer: () => void
}

const DashboardAppBar: FC<DashboardAppBarProps> = (props) => {
  const classes = useStyles(props)
  const isMobile = useIsMobile()

  return (
    <AppBar color="inherit" elevation={1} position="sticky">
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
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
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

export default DashboardAppBar
