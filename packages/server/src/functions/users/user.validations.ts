import { USER_GROUPS } from 'utils/constants'
import * as yup from 'yup'

export const createStudentsValidation = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        studentId: yup
          .string()
          .trim()
          .required(),
        username: yup.string().trim(),
        name: yup
          .string()
          .trim()
          .required(),
        checkerId: yup.string().trim(),
        birthday: yup.date().required(),
        hometown: yup
          .string()
          .trim()
          .required(),
        sex: yup
          .string()
          .trim()
          .required(),
        class: yup
          .string()
          .trim()
          .required(),
        schoolYear: yup
          .number()
          .moreThan(1900)
          .required(),
        group: yup
          .string()
          .oneOf(USER_GROUPS)
          .required(),
        boardingRoom: yup
          .string()
          .trim()
          .required(),
      })
      .required(),
  )
  .required('user data is required')
