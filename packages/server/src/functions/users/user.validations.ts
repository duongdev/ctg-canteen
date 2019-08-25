import { GET_USERS_SORT_BY } from 'functions/users/user.types'
import { USER_CLASSES, USER_GROUPS, USER_ROLES, USER_SEX } from 'models/User'
import moment from 'moment'
import * as yup from 'yup'

const baseUserValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Mã người dùng không được để trống'),
  password: yup
    .string()
    .trim()
    .ensure()
    .required('Mật khẩu không được để trống'),
  name: yup
    .string()
    .trim()
    .required(),
  checkerId: yup.string().trim(),
  birthdate: yup.date().transform(function($value, originalValue) {
    if (this.isType($value)) return $value

    try {
      const value = moment(new Date(originalValue).toISOString())
      if (value.isValid()) {
        return value.toDate()
      }

      throw new Error('Ngày sinh phải đúng định dạng MM/DD/YYYY')
    } catch (error) {
      throw new Error('Ngày sinh phải đúng định dạng MM/DD/YYYY')
    }
  }),
  hometown: yup.string(),
  sex: yup
    .string()
    .trim()
    .oneOf(USER_SEX, `Giới tính phải là một trong ${USER_SEX.join(', ')}`),
  class: yup
    .string()
    .trim()
    .oneOf(
      USER_CLASSES,
      `Lớp học phải là một trong các lớp sau ${USER_CLASSES.join(', ')}`,
    ),
  schoolYear: yup.number().moreThan(1900),
  group: yup
    .string()
    .oneOf(
      USER_GROUPS,
      `Nhóm phải là một trong các nhóm sau ${USER_GROUPS.join(', ')}`,
    ),
  boardingRoom: yup.string().trim(),
  roles: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(
          USER_ROLES,
          `Quyền người dùng phải là một trong các quyền sau ${USER_ROLES.join(
            ', ',
          )}`,
        ),
    ),
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
  .min(1, 'Danh sách không được rỗng')
  .required()

export const getUsersFilterValidation = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive('limit phải là số nguyên dương')
    .default(10),
  page: yup
    .number()
    .integer()
    .positive('page phải là số nguyên dương')
    .default(1),
  sortBy: yup
    .string()
    .oneOf(
      GET_USERS_SORT_BY,
      `sortBy phải là một trong ${GET_USERS_SORT_BY.join(', ')}`,
    )
    .default('reverse_createdAt'),
})
