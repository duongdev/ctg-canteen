import React, { FC } from 'react'

import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core'
import { DrawerProps } from '@material-ui/core/Drawer'
import Logo from 'components/shared/Logo'
import { Account, ClipboardCheckOutline, Food } from 'mdi-material-ui'
import { Link, NavLink, NavLinkProps } from 'react-router-dom'

export type DrawerProps = {
  open: boolean
  onClose: DrawerProps['onClose']
} & DrawerProps

const AdapterNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => <NavLink innerRef={ref as any} {...props} />,
)

const navMenu = [
  { name: 'Người dùng', icon: Account, path: 'users' },
  { name: 'Món ăn', icon: Food, path: 'dishes' },
  { name: 'Đợt đăng ký', icon: ClipboardCheckOutline, path: 'registrations' },
]

const Drawer: FC<DrawerProps> = (props) => {
  const classes = useStyles(props)
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <MUIDrawer variant={isMdUp ? 'permanent' : 'temporary'} {...props}>
      <Link to="/" className={classes.header}>
        <Logo />
      </Link>
      <List
        className={classes.list}
        subheader={
          <ListSubheader className={classes.listSubheader}>
            Quản trị
          </ListSubheader>
        }
      >
        {navMenu.map(({ icon: Icon, ...menuItem }) => (
          <ListItem
            key={menuItem.path}
            className={classes.listItem}
            component={AdapterNavLink}
            to={`/dashboard/${menuItem.path}`}
          >
            <ListItemIcon className={classes.listItemIcon} color="inherit">
              <Icon color="inherit" />
            </ListItemIcon>
            <ListItemText>{menuItem.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </MUIDrawer>
  )
}

const useStyles = makeStyles(
  ({ spacing, shape, palette, mixins, shadows, typography }) => ({
    paper: {},
    header: {
      ...mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      padding: spacing(0, 3.5),
      boxShadow: shadows[1],
    },
    list: {
      padding: spacing(2),
    },
    listSubheader: {
      ...typography.button,
      fontWeight: 'bold',
      marginBottom: spacing(1.5),
      letterSpacing: '0.04rem',
    },
    listItem: {
      borderRadius: shape.borderRadius,
      margin: spacing(0.5, 0),

      '&.active': {
        backgroundColor: palette.primary.main,
        color: '#FFF',
      },

      '&:active': {
        backgroundColor: `${palette.primary.dark} !important`,
      },

      '&.active:hover': {
        backgroundColor: `${palette.primary.dark} !important`,
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
  }),
)

export default Drawer
