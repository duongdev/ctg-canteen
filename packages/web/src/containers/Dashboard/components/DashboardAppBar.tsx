import React, { FC } from 'react'

import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import { Menu } from 'mdi-material-ui'

export type DashboardAppBarProps = {
  onOpenDrawer: () => void
}

const DashboardAppBar: FC<DashboardAppBarProps> = (props) => {
  const classes = useStyles(props)

  return (
    <AppBar color="inherit" elevation={1}>
      <Toolbar>
        <Grid container>
          <Grid item>
            <IconButton
              onClick={props.onOpenDrawer}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  menuButton: {
    marginLeft: -spacing(2),
  },
}))

export default DashboardAppBar
