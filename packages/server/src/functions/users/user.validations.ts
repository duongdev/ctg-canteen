import { USER_CLASSES, USER_GROUPS, USER_ROLES, USER_SEX } from 'models/User'
import moment from 'moment'
import * as yup from 'yup'

/** date string format must be MM/DD/YYYY */
yup.addMethod(yup.date, 'format', function (formats, parseStrict) {
  return this.transform(function (value, originalValue) {
    if (this.isType(value)) return value
    try {
      const newValue = moment(
        new Date(originalValue).toISOString(),
        formats,
        parseStrict,
      )

      return newValue.isValid() ? newValue.toDate() : 'Invalid Date'
    } catch (err) {
      return 'birthdate must be a `date` type, but the final value was: `\"Invalid Date\"`'
    }
  })
})

const baseUserValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(),
  name: yup
    .string()
    .trim()
    .required(),
  checkerId: yup.string().trim(),
  birthdate: (yup.date() as any).format().required(),
  hometown: yup.string().required(),
  sex: yup
    .string()
    .trim()
    .oneOf(USER_SEX)
    .required(),
  class: yup
    .string()
    .trim()
    .oneOf(USER_CLASSES)
    .required(),
  schoolYear: yup
    .number()
    .moreThan(1900)
    .required(),
  group: yup
    .string()
    .oneOf(USER_GROUPS)
    .required(),
  boardingRoom: yup.string().trim(),
  password: yup
    .string()
    .trim()
    .ensure()
    .required(),
  roles: yup.array().of(yup.string().oneOf(USER_ROLES)),
})

export const createUserValidation = baseUserValidation.required()

export const createUsersValidation = yup
  .array()
  .of(
    yup
      .object()
      .concat(baseUserValidation)
      .shape({
        password: yup
          .string()
          .trim()
          .ensure(),
      })
      .required(),
  )
  .min(1)
  .required('user data is required')
