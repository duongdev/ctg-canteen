import React, { useState } from 'react'

import {
  Avatar,
  Button,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { AdapterLink } from 'components/shared/LinkButton'
import useAuth from 'hooks/useAuth'
import { Account, ExitToApp } from 'mdi-material-ui'

type AppBarUserProps = {}

const AppBarUser: React.FC<AppBarUserProps> = (props) => {
  const classes = useStyles(props)

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleOpen: ButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!user) return null

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {user.name || user.username}
        <Avatar className={classes.avatar}>
          <Account />
        </Avatar>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: anchorEl && anchorEl.clientWidth + 2,
            marginTop: -10,
          },
        }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          component={AdapterLink}
          to="/my-account"
          onClick={handleClose}
        >
          <ListItemIcon>
            <Account />
          </ListItemIcon>
          Tài khoản
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  avatar: {
    marginLeft: spacing(1),
  },
}))

export default AppBarUser
