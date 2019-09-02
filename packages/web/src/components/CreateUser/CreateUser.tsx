import React, { FC, useCallback, useMemo } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { CREATE_USER } from 'apollo/users.gql'
import { getGraphQLErrors } from 'apollo/utils'
import ErrorMessage from 'components/ErrorMessage'
import CreateUpdateUserForm, {
  CreateUpdateUserValues,
} from 'components/forms/CreateUpdateUserForm'
import ContentContainer from 'components/shared/ContentContainer'
import PageTitle from 'components/shared/PageTitle'
import { FormikActions } from 'formik'
import { useSnackbar } from 'notistack'
import IUser from 'typings/User'

const initialValues: CreateUpdateUserValues = {
  name: '',
  username: '',
  password: '',
  checkerId: '',
  birthdate: '',
  hometown: '',
  sex: 'male',
  class: 'none',
  schoolYear: 2019,
  group: 'other',
  boardingRoom: '',
}

type CreateUserData = {
  createUser: {
    createdUser: IUser
    overriddenCheckerIdUser: IUser
  }
}

type CreateUserVariables = {
  input: CreateUpdateUserValues
  options: {
    overrideCheckerId?: boolean
    generatePasswordFromUsername?: boolean
  }
}

const CreateUser: FC = (props) => {
  const classes = useStyles(props)
  // prettier-ignore
  const [createUser, { error }] = useMutation<CreateUserData, CreateUserVariables>(CREATE_USER)
  const { enqueueSnackbar } = useSnackbar()

  const errors = useMemo(() => {
    return getGraphQLErrors(error)
  }, [error])

  const handleCreateUser = useCallback(
    async (
      variables: CreateUpdateUserValues,
      form: FormikActions<CreateUpdateUserValues>,
    ) => {
      form.setSubmitting(true)
      try {
        const { data } = await createUser({
          variables: {
            input: {
              ...variables,
              password: variables.password || variables.username,
            },
            options: {
              generatePasswordFromUsername: !variables.password,
            },
          },
        })

        if (data && data.createUser) {
          enqueueSnackbar(
            <Typography>
              Đã tạo thành công người dùng{' '}
              <strong>{data.createUser.createdUser.name}</strong> (
              {data.createUser.createdUser.username}).
            </Typography>,
            {
              variant: 'success',
            },
          )
          form.resetForm()
        }
      } catch (e) {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng kiểm tra lại.', {
          variant: 'error',
        })
      } finally {
        form.setSubmitting(false)
      }
    },
    [createUser, enqueueSnackbar],
  )

  return (
    <ContentContainer maxWidth="sm">
      <PageTitle title="Tạo người dùng mới" />

      <Box component={Paper} padding={2} marginBottom={2}>
        <Typography
          variant="button"
          color="textSecondary"
          display="block"
          className={classes.formTitle}
        >
          Thông tin người dùng
        </Typography>
        <CreateUpdateUserForm
          initialValues={initialValues}
          onSubmit={handleCreateUser}
        />
      </Box>

      {errors && (
        <Grid container spacing={2} direction="column">
          {errors.map((error, idx) => (
            <Grid item key={idx}>
              <ErrorMessage>
                <Typography>{error.message}</Typography>
              </ErrorMessage>
            </Grid>
          ))}
        </Grid>
      )}
    </ContentContainer>
  )
}

const useStyles = makeStyles(({ spacing, shape, palette }) => ({
  formTitle: {
    marginBottom: spacing(2),
  },
}))

export default CreateUser
