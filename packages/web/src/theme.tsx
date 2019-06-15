import primary from '@material-ui/core/colors/blue'
import secondary from '@material-ui/core/colors/pink'
import { createMuiTheme } from '@material-ui/core/styles'

const dark = !true

export const headingFontFamily =
  '"Product Sans", "SVN-Product Sans", "Roboto", "Helvetica", "Arial", sans-serif'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    type: dark ? 'dark' : 'light',
    background: {
      default: dark ? '#000' : '#fafafa',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    h6: { fontFamily: headingFontFamily },
    h5: {
      fontFamily: headingFontFamily,
      fontWeight: 500,
      fontSize: 26,
    },
    h4: { fontFamily: headingFontFamily },
    h3: { fontFamily: headingFontFamily },
    h2: { fontFamily: headingFontFamily },
    h1: { fontFamily: headingFontFamily },
  },
})

export default {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
}
