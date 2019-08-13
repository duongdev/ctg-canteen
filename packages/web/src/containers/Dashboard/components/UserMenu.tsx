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
import { AdapterLink } from 'components/LinkButton'
import { Account, ExitToApp } from 'mdi-material-ui'

type UserMenuProps = {}

const UserMenu: React.FC<UserMenuProps> = (props) => {
  const classes = useStyles(props)

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const handleOpen: ButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Dương Đỗ
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
        <MenuItem component={AdapterLink} to="/sign-in" onClick={handleClose}>
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

export default UserMenu
