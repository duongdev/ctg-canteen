import React, { FC } from 'react'

import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import CreateUpdateUserForm, {
  CreateUpdateUserValues,
} from 'components/forms/CreateUpdateUserForm'
import ContentContainer from 'components/shared/ContentContainer'
import PageTitle from 'components/shared/PageTitle'

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
  room: ''
}

const CreateUser: FC = (props) => {
  const classes = useStyles(props)

  return (
    <ContentContainer maxWidth="sm">
      <PageTitle title="Tạo người dùng mới" />

      <Box component={Paper} padding={2}>
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
          onSubmit={console.log}
        />
      </Box>
    </ContentContainer>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  formTitle: {
    marginBottom: spacing(2),
  },
}))

export default CreateUser
