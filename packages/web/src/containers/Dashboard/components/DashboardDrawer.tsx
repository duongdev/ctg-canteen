import React, { FC } from 'react'

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { DrawerProps } from '@material-ui/core/Drawer'
import { Account, ClipboardCheckOutline, Food } from 'mdi-material-ui'

export type DashboardDrawerProps = {
  open: boolean
  onClose: DrawerProps['onClose']
}

const navMenu = [
  { name: 'Người dùng', icon: Account, path: 'users' },
  { name: 'Món ăn', icon: Food, path: 'dishes' },
  { name: 'Đợt đăng ký', icon: ClipboardCheckOutline, path: 'registrations' },
]

const DashboardDrawer: FC<DashboardDrawerProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Drawer {...props}>
      <List className={classes.list}>
        {navMenu.map(({ icon: Icon, ...menuItem }) => (
          <ListItem button key={menuItem.path} className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon} color="inherit">
              <Icon color="inherit" />
            </ListItemIcon>
            <ListItemText>{menuItem.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

const useStyles = makeStyles(({ spacing, shape, palette }) => ({
  list: {
    padding: spacing(2),
  },
  listItem: {
    borderRadius: shape.borderRadius,

    '&.active': {
      backgroundColor: palette.primary.main,
      color: '#FFF',
    },

    '&:hover': {
      backgroundColor: palette.primary.light,
      color: '#FFF',
    },
  },
  listItemIcon: {
    minWidth: 40,
    color: 'inherit',
  },
}))

export default DashboardDrawer
