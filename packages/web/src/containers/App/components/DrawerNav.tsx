import React from 'react'

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import { APP_NAME } from 'constants/global'
import { DRAWER_WIDTH } from 'constants/layout'
import { AccountMultiple, CashRegister, Food, Home } from 'mdi-material-ui'
import { Link, matchPath } from 'react-router-dom'
import useRouter from 'use-react-router'

const categories = [
  {
    id: 'Quản trị',
    children: [
      {
        id: 'Người dùng',
        icon: <AccountMultiple />,
        to: '/users',
        active: true,
      },
      { id: 'Món ăn', icon: <Food />, to: '/dishes', active: false },
      {
        id: 'Đăng ký ăn',
        icon: <CashRegister />,
        to: '/meal-subscriptions',
        active: false,
      },
    ],
  },
]

type DrawerNavProps = {}

const DrawerNav: React.FC<DrawerNavProps> = (props) => {
  const classes = useStyles(props)
  const { location } = useRouter()

  return (
    <Drawer variant="permanent" classes={{ paper: classes.root }}>
      <Box color="white">
        <List disablePadding>
          <ListItem
            className={clsx(classes.logo, classes.item, classes.itemCategory)}
          >
            <Typography variant="h4">{APP_NAME}</Typography>
          </ListItem>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <Home />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Project Overview
            </ListItemText>
          </ListItem>
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, to }) => {
                const active = matchPath(location.pathname, to)
                return (
                  <Link key={childId} to={to}>
                    <ListItem
                      button
                      className={clsx(
                        classes.item,
                        active && classes.itemActiveItem,
                      )}
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary,
                        }}
                      >
                        {childId}
                      </ListItemText>
                    </ListItem>
                  </Link>
                )
              })}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: DRAWER_WIDTH,
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}))

export default DrawerNav
