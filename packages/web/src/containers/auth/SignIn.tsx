import React, { useCallback, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  Hidden,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import Helmet from 'components/Helmet'
import { Field, FieldProps, Form, Formik } from 'formik'
import useRouter from 'use-react-router'
import { sleep } from 'utils/dev'

const defaultValues = {
  username: '',
  password: '',
}

type FieldValues = typeof defaultValues

type SignInProps = {}

const SignIn: React.FC<SignInProps> = () => {
  const classes = useStyles()
  const { history } = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignIn = useCallback(async () => {
    setLoading(true)
    await sleep()
    history.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet title="Đăng nhập" />
      <Grid container className={classes.root}>
        <Hidden smDown>
          <Grid item md={9} />
        </Hidden>
        <Grid item xs={12} md={3}>
          <Paper className={classes.signInPaper}>
            {loading && (
              <Box position="absolute" top={0} left={0} right={0}>
                <LinearProgress />
              </Box>
            )}
            <Typography variant="h4">Đăng nhập</Typography>

            <Formik initialValues={defaultValues} onSubmit={handleSignIn}>
              {(form) => (
                <Form
                  onSubmitCapture={form.submitForm}
                  className={classes.form}
                >
                  <Field name="username">
                    {({ field }: FieldProps<FieldValues>) => (
                      <TextField
                        label="Tên đăng nhập"
                        variant="filled"
                        margin="dense"
                        fullWidth
                        required
                        autoFocus
                        disabled={loading}
                        {...field}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: FieldProps<FieldValues>) => (
                      <TextField
                        label="Mật khẩu"
                        variant="filled"
                        margin="dense"
                        type="password"
                        fullWidth
                        required
                        disabled={loading}
                        {...field}
                      />
                    )}
                  </Field>
                  <Box display="flex" justifyContent="flex-end" marginTop={4}>
                    <Button
                      disabled={loading}
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={form.submitForm}
                    >
                      Đăng nhập
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: '100vh',
  },
  signInPaper: {
    height: '100%',
    padding: spacing(2),
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  form: {
    margin: spacing(6, 0, 4, 0),
  },
}))

export default SignIn
