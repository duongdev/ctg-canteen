import React, { FC } from 'react'

import { Box, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import LinkButton from 'components/shared/LinkButton'
import Logo from 'components/shared/Logo'
import { ArrowRight } from 'mdi-material-ui'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

const SignIn: FC = (props) => {
  const classes = useStyles(props)

  return (
    <>
      <Helmet title="Đăng nhập" />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box component={Paper} padding={4} minWidth="300px" maxWidth="90vw">
          <Grid container spacing={2} direction="column">
            <Grid item className={classes.header}>
              <Link to="/">
                <Logo />
              </Link>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                autoFocus
                variant="outlined"
                label="Tên đăng nhập"
                placeholder="Tên đăng nhập"
                margin="normal"
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Mật khẩu"
                placeholder="••••••••••"
                type="password"
                margin="normal"
              />
            </Grid>

            <Grid item className={classes.actions}>
              <Grid container alignItems="center">
                <Grid item xs />
                <Grid item>
                  <LinkButton
                    to="/dashboard"
                    size="large"
                    color="primary"
                    variant="contained"
                  >
                    Đăng nhập
                    <Box component={ArrowRight} marginLeft={2} />
                  </LinkButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(({ palette, spacing }) => ({
  header: {
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
  },

  actions: {
    marginTop: spacing(4),
  },

  '@global': {
    body: {
      background:
        'linear-gradient(45deg, rgb(164, 210, 185) 0%, rgb(164, 210, 185) 13%,rgb(140, 185, 176) 13%, rgb(140, 185, 176) 18%,rgb(116, 160, 167) 18%, rgb(116, 160, 167) 22%,rgb(92, 135, 158) 22%, rgb(92, 135, 158) 23%,rgb(67, 109, 148) 23%, rgb(67, 109, 148) 26%,rgb(43, 84, 139) 26%, rgb(43, 84, 139) 31%,rgb(19, 59, 130) 31%, rgb(19, 59, 130) 100%)',
    },
  },
}))

export default SignIn
