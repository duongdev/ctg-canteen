import { USER_GROUPS, USER_ROLES } from 'models/User'
import * as yup from 'yup'

export const createUserValidation = yup
  .object()
  .shape({
    studentId: yup.string().trim(),
    username: yup.string().trim(),
    name: yup
      .string()
      .trim()
      .required(),
    checkerId: yup.string().trim(),
    birthdate: yup.date().required(),
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
    password: yup
      .string()
      .trim()
      .ensure()
      .required(),
    roles: yup.array().of(yup.string().oneOf(USER_ROLES)),
  })
  .test(
    'at-least-one-studentId-or-username',
    'you must provide at least one of studentId or username',
    (params) => {
      return !!(params.studentId || params.username)
    },
  )
  .required()

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
        birthdate: yup.date().required(),
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
        password: yup
          .string()
          .trim()
          .ensure(),
      })
      .required(),
  )
  .min(1)
  .required('user data is required')
