import keys from 'lodash/keys'
import React, { FC, ReactNode } from 'react'

import {
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  Grow,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { GridProps } from '@material-ui/core/Grid'
import { OutlinedTextFieldProps } from '@material-ui/core/TextField'
import { selectValues } from 'constants/users'
import { Field, FieldProps, Form, Formik, FormikActions } from 'formik'
import { Check } from 'mdi-material-ui'
import IUser from 'typings/User'
import * as yup from 'yup'

export type CreateUpdateUserValues = {
  name: IUser['name']
  username: IUser['username']
  password: string
  checkerId: string
  birthdate: string
  hometown: IUser['hometown']
  sex: IUser['sex']
  class: IUser['class']
  schoolYear: IUser['schoolYear'] | null
  group: IUser['group']
  boardingRoom: IUser['boardingRoom']
}
type Values = CreateUpdateUserValues

const fieldsProps: {
  [field in keyof CreateUpdateUserValues]: Partial<OutlinedTextFieldProps> & {
    grid?: GridProps
    selectValues?: {
      [key: string]: ReactNode
    }
    labelWidth?: number
  }
} = {
  name: {
    autoFocus: true,
    label: 'Họ và tên',
    placeholder: 'Viết đúng hoa thường. VD: Đỗ Cao Thượng Dương',
  },
  username: {
    grid: { sm: 6 },
    label: 'Mã người dùng',
    placeholder: 'Mã HS hoặc tên đăng nhập',
  },
  password: {
    grid: { sm: 6 },
    label: 'Mật khẩu',
    placeholder: 'Mặc định là mã người dùng',
    type: 'password',
  },
  checkerId: {
    grid: { sm: 6 },
    label: 'Mã máy chấm công',
  },
  birthdate: {
    grid: { sm: 6 },
    label: 'Ngày sinh',
    type: 'date',
    InputLabelProps: {
      shrink: true,
    },
  },
  hometown: {
    grid: { sm: 6 },
    label: 'Quê quán',
  },
  sex: {
    grid: { sm: 6 },
    label: 'Giới tính',
    selectValues: {
      male: 'Nam',
      female: 'Nữ',
    },
    labelWidth: 65,
  },
  class: {
    grid: { sm: 6 },
    label: 'Lớp',
    selectValues: selectValues.class,
    labelWidth: 28,
  },
  schoolYear: {
    grid: { sm: 6 },
    label: 'Niên khoá',
    selectValues: selectValues.schoolYear,
    labelWidth: 80,
  },
  group: {
    grid: { sm: 6 },
    label: 'Nhóm',
    selectValues: selectValues.group,
    labelWidth: 49,
  },
  boardingRoom: {
    grid: { sm: 6 },
    label: 'Phòng nội/ngoại trú',
  },
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Họ và tên không được để trống'),
  username: yup
    .string()
    .required('Mã người dùng không được để trống')
    .min(4, 'Mã người dùng phải có ít nhất 4 ký tự'),
  password: yup.string().min(3, 'Mật khẩu phải có ít nhất 3 ký tự'),
  checkerId: yup.string(),
  birthdate: yup.string(),
  hometown: yup.string(),
  sex: yup.string().oneOf(['male', 'female']),
  class: yup.string(),
  schoolYear: yup.number(),
  group: yup.string().required(),
  room: yup.string(),
})

export type CreateUpdateUserFormProps = {
  initialValues: Values
  onSubmit: (values: Values, formikActions: FormikActions<Values>) => void
}

const CreateUpdateUserForm: FC<CreateUpdateUserFormProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={validationSchema}
    >
      {(form) => (
        <>
          <Form>
            <Grid container spacing={2}>
              {keys(props.initialValues).map((fieldName) => {
                const {
                  grid: gridProps,
                  selectValues,
                  labelWidth = 0,
                  ...textFieldProps
                } = fieldsProps[fieldName as keyof CreateUpdateUserValues]

                const error: string | null =
                  (form.touched as any)[fieldName] &&
                  (form.errors as any)[fieldName]

                if (selectValues) {
                  return (
                    <Field
                      key={fieldName}
                      name={fieldName}
                      render={({ field }: FieldProps<Values>) => (
                        <Grid item xs={12} {...gridProps}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="age-simple">
                              {textFieldProps.label}
                            </InputLabel>
                            <Select
                              value={field.value}
                              onChange={field.onChange}
                              input={
                                <OutlinedInput
                                  labelWidth={labelWidth}
                                  name={fieldName}
                                />
                              }
                            >
                              {Object.entries(selectValues).map(
                                ([value, label]) => (
                                  <MenuItem key={value} value={value}>
                                    {label}
                                  </MenuItem>
                                ),
                              )}
                            </Select>
                            {error && <FormHelperText>{error}</FormHelperText>}
                          </FormControl>
                        </Grid>
                      )}
                    />
                  )
                }

                return (
                  <Field
                    key={fieldName}
                    name={fieldName}
                    render={({ field }: FieldProps<Values>) => (
                      <Grid item xs={12} {...gridProps}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          {...field}
                          {...textFieldProps}
                          error={!!error}
                          helperText={error}
                        />
                      </Grid>
                    )}
                  />
                )
              })}
            </Grid>
          </Form>
          <Grow in timeout={300}>
            <Tooltip title="Lưu người dùng">
              <Fab
                onClick={form.submitForm}
                color="primary"
                className={classes.fab}
              >
                <Check />
              </Fab>
            </Tooltip>
          </Grow>
        </>
      )}
    </Formik>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  fab: {
    position: 'fixed',
    bottom: spacing(2),
    right: spacing(3),
  },
}))

export default CreateUpdateUserForm
