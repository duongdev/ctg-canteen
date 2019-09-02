import React, { FC, useCallback, useEffect } from 'react'

import { useMutation } from '@apollo/react-hooks'
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { SIGN_IN } from 'apollo/users'
import Logo from 'components/shared/Logo'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import { ArrowRight } from 'mdi-material-ui'
import { useCookies } from 'react-cookie'
import Helmet from 'react-helmet'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ERROR_BACKGROUND } from 'theme'

const initialValues = {
  username: '',
  password: '',
}

type Values = typeof initialValues

const SignIn: FC<RouteComponentProps> = (props) => {
  const classes = useStyles(props)
  const [signIn, { loading, error }] = useMutation<{ signIn: string }>(SIGN_IN)
  const [, setCookie, removeCookie] = useCookies(['access_token'])

  useEffect(() => {
    removeCookie('access_token', { path: '/' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignIn = useCallback(
    async (values: Values) => {
      const { data } = await signIn({ variables: values })
      const token = data && data.signIn
      if (!token) return

      setCookie('access_token', token, { path: '/' })
      props.history.push(props.location.state ? props.location.state.from : '/')
    },
    [signIn, setCookie, props.history, props.location.state],
  )

  const handleKeyDown = useCallback(
    (form: FormikProps<Values>) => (
      event: React.KeyboardEvent<HTMLFormElement>,
    ) => {
      if (event.keyCode === 13) form.submitForm()
    },
    [],
  )

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
          <Formik initialValues={initialValues} onSubmit={handleSignIn}>
            {(form) => (
              <Form onKeyDown={handleKeyDown(form)}>
                <Grid container spacing={2} direction="column">
                  <Grid item className={classes.header}>
                    <Link to="/">
                      <Logo />
                    </Link>
                  </Grid>

                  <Grid item>
                    <Field
                      name="username"
                      render={({ field }: FieldProps<Values>) => (
                        <TextField
                          {...field}
                          fullWidth
                          autoFocus
                          variant="outlined"
                          label="Tên đăng nhập"
                          placeholder="Tên đăng nhập"
                          margin="normal"
                          disabled={loading}
                        />
                      )}
                    />
                    <Field
                      name="password"
                      render={({ field }: FieldProps<Values>) => (
                        <TextField
                          {...field}
                          fullWidth
                          variant="outlined"
                          label="Mật khẩu"
                          placeholder="••••••••••"
                          type="password"
                          margin="normal"
                          disabled={loading}
                        />
                      )}
                    />
                  </Grid>

                  {error &&
                    error.graphQLErrors.map((graphqlError, idx) => (
                      <Grid item key={idx}>
                        <Typography
                          variant="body2"
                          color="error"
                          className={classes.error}
                        >
                          {graphqlError.message}
                        </Typography>
                      </Grid>
                    ))}

                  <Grid item className={classes.actions}>
                    <Grid container alignItems="center">
                      <Grid item xs />
                      <Grid item>
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          onClick={form.submitForm}
                          disabled={loading}
                        >
                          Đăng nhập
                          <Box component={ArrowRight} marginLeft={2} />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(({ spacing, palette, shape }) => ({
  header: {
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
  },

  actions: {
    marginTop: spacing(4),
  },

  error: {
    padding: spacing(1, 2),
    borderRadius: shape.borderRadius,
    border: `solid 1px ${palette.error.main}`,
    backgroundColor: ERROR_BACKGROUND,
  },

  '@global': {
    body: {
      background:
        'linear-gradient(45deg, rgb(164, 210, 185) 0%, rgb(164, 210, 185) 13%,rgb(140, 185, 176) 13%, rgb(140, 185, 176) 18%,rgb(116, 160, 167) 18%, rgb(116, 160, 167) 22%,rgb(92, 135, 158) 22%, rgb(92, 135, 158) 23%,rgb(67, 109, 148) 23%, rgb(67, 109, 148) 26%,rgb(43, 84, 139) 26%, rgb(43, 84, 139) 31%,rgb(19, 59, 130) 31%, rgb(19, 59, 130) 100%)',
    },
  },
}))

export default SignIn
