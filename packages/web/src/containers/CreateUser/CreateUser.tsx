import React, { FC } from 'react'

import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import ContentContainer from 'components/dashboard/ContentContainer'
import PageTitle from 'components/dashboard/PageTitle'
import CreateUpdateUserForm, {
  CreateUpdateUserValues,
} from 'components/forms/CreateUpdateUserForm'

const initialValues: CreateUpdateUserValues = {
  name: '',
  username: '',
  checkerId: '',
  birthdate: '',
  sex: 'male',
  class: 'none',
  schoolYear: 2019,
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
