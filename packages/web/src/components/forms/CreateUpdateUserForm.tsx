import React, { FC, ReactNode } from 'react'

import {
  Fab,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@material-ui/core'
import { GridProps } from '@material-ui/core/Grid'
import { OutlinedTextFieldProps } from '@material-ui/core/TextField'
import { Field, FieldProps, Form, Formik, FormikActions } from 'formik'
import IUser from 'interfaces/User'
import { Check } from 'mdi-material-ui'

export type CreateUpdateUserValues = {
  fullName: IUser['fullName']
  username: IUser['username']
  checkerId: string
  birthdate: string
  sex: IUser['sex']
  class: IUser['class']
  schoolYear: IUser['schoolYear'] | null
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
  fullName: {
    autoFocus: true,
    label: 'Họ và tên',
    placeholder: 'Viết đúng hoa thường. VD: Đỗ Cao Thượng Dương',
  },
  username: {
    grid: { sm: 6 },
    label: 'Mã người dùng',
    placeholder: 'Mã HS hoặc tên đăng nhập',
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
    selectValues: {
      none: 'Không chọn',
      math: 'Toán',
      informatics: 'Tin',
      physics: 'Lý',
      chemistry: 'Hoá',
      biology: 'Sinh',
      english: 'Anh',
      literature: 'Văn',
      history: 'Sử',
      geography: 'Địa',
      normal: 'Không chuyên',
    },
    labelWidth: 28,
  },
  schoolYear: {
    grid: { sm: 6 },
    label: 'Niên khoá',
    selectValues: {
      2019: '2019',
      2020: '2020',
      2021: '2021',
      2022: '2022',
      2023: '2023',
      2024: '2024',
      2025: '2025',
    },
    labelWidth: 80,
  },
}

export type CreateUpdateUserFormProps = {
  initialValues: Values
  onSubmit: (values: Values, formikActions: FormikActions<Values>) => void
}

const CreateUpdateUserForm: FC<CreateUpdateUserFormProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Formik onSubmit={props.onSubmit} initialValues={props.initialValues}>
      {(form) => (
        <>
          <Form>
            <Grid container spacing={2}>
              {Object.keys(props.initialValues).map((fieldName) => {
                const {
                  grid: gridProps,
                  selectValues,
                  labelWidth = 0,
                  ...textFieldProps
                } = fieldsProps[fieldName as keyof CreateUpdateUserValues]

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
                        />
                      </Grid>
                    )}
                  />
                )
              })}
            </Grid>
          </Form>
          <Grow in timeout={300}>
            <Fab
              onClick={form.submitForm}
              color="primary"
              className={classes.fab}
            >
              <Check />
            </Fab>
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
