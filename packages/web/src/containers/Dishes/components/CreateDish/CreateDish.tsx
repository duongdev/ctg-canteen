import React from 'react'

import { Grid, TextField } from '@material-ui/core'
import ContentContainer from 'components/ContentContainer'
import Section from 'components/Section'
import { Field, FieldProps, Form, Formik } from 'formik'

const initialValues = {
  name: '',
  description: '',
}

type Values = typeof initialValues

type CreateDishProps = {}

const CreateDish: React.FC<CreateDishProps> = () => {
  return (
    <ContentContainer maxWidth="sm">
      <Section title="Thêm món ăn mới">
        <Formik initialValues={initialValues} onSubmit={console.log}>
          {(form) => (
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
                        label="Tên món ăn"
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
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Section>
    </ContentContainer>
  )
}

export default CreateDish
