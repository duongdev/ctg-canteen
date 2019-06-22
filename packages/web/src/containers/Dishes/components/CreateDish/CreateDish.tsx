import React, { useCallback } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core'
import ContentContainer from 'components/ContentContainer'
import ImagesPicker from 'components/ImagesPicker'
import Section from 'components/Section'
import { Field, FieldProps, Form, Formik, FormikActions } from 'formik'
import useRouter from 'use-react-router'
import { sleep } from 'utils/dev'
import { getBase64 } from 'utils/files'
import * as yup from 'yup'

const initialValues = {
  name: '',
  description: '',
  images: [] as File[],
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'Tên món ăn có ít nhất 3 ký tự')
    .max(30, 'Tối đa 30 ký tự')
    .required('Tên món ăn là bắt buộc'),
  description: yup
    .string()
    .trim()
    .max(200, 'Tối đa 200 ký tự'),
  images: yup.mixed(),
})

type Values = typeof initialValues

type CreateDishProps = {}

const CreateDish: React.FC<CreateDishProps> = (props) => {
  const classes = useStyles(props)
  const { history } = useRouter()
  const handleSubmit = useCallback(
    async (values: Values, form: FormikActions<Values>) => {
      await form.setSubmitting(true)
      const images = await Promise.all(values.images.map(getBase64))

      await sleep()
      console.log(values, images)

      history.push('/dishes')

      await form.setSubmitting(false)
    },
    // eslint-disable-next-line
    [],
  )

  return (
    <ContentContainer maxWidth="sm">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(form) => (
          <>
            <Section title="Thêm món ăn mới">
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="name"
                      render={({ field }: FieldProps<Values>) => (
                        <TextField
                          variant="outlined"
                          autoFocus
                          fullWidth
                          required
                          label="Tên món ăn"
                          disabled={form.isSubmitting}
                          error={!!(form.touched.name && form.errors.name)}
                          helperText={form.touched.name && form.errors.name}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="description"
                      render={({ field }: FieldProps<Values>) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Mô tả món ăn"
                          multiline
                          rows={2}
                          rowsMax={4}
                          disabled={form.isSubmitting}
                          error={
                            !!(
                              form.touched.description &&
                              form.errors.description
                            )
                          }
                          helperText={
                            form.touched.description && form.errors.description
                              ? form.errors.description
                              : `Còn lại ${200 - field.value.length} ký tự`
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="images"
                      render={({ field }: FieldProps<Values>) => (
                        <ImagesPicker
                          onChange={(images) =>
                            form.setFieldValue('images', images)
                          }
                          className={classes.imagesPicker}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Form>
            </Section>
            <Box marginTop={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    disableRipple
                    variant="contained"
                    color="primary"
                    onClick={form.submitForm}
                    disabled={form.isSubmitting}
                  >
                    Tạo món ăn
                  </Button>
                </Grid>
                {form.isSubmitting && (
                  <Grid item>
                    <CircularProgress size={28} />
                  </Grid>
                )}
              </Grid>
            </Box>
          </>
        )}
      </Formik>
    </ContentContainer>
  )
}

const useStyles = makeStyles(({ palette, spacing, shape }) => ({
  imagesPicker: {
    border: `solid 1px ${palette.divider}`,
    padding: spacing(2),
    borderRadius: shape.borderRadius,
    outline: 'none',
  },
}))

export default CreateDish
