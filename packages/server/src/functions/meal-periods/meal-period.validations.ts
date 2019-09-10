import moment from 'moment'
import * as yup from 'yup'
import { MEAL_PERIOD_ORDER_BY } from './meal-period.types'

export const createMealPeriodValidation = yup
  .object()
  .shape({
    name: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .notRequired(),
    registrationStartsAt: yup
      .date()
      .required('Ngày mở đăng ký không được để trống')
      .when(
        'registrationEndsAt',
        (registrationEndsAt: Date, schema: yup.DateSchema) => {
          if (schema.isType(registrationEndsAt)) {
            return schema.max(
              moment(registrationEndsAt)
                .subtract(1, 'seconds')
                .toDate(),
              `Ngày mở đăng ký phải trước ngày đóng đăng ký (${moment(
                registrationEndsAt,
              ).format('DD/MM/YYYY')})`,
            )
          }
        },
      ),
    registrationEndsAt: yup
      .date()
      .required('Ngày đóng đăng ký không được để trống'),
    createdByUserId: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .required('Mã người tạo không được để trống'),
  })
  .required()

export const getMealPeriodsInputValidation = yup
  .object()
  .shape({
    search: yup
      .string()
      .trim()
      .ensure()
      .strict(true)
      .notRequired(),
    registrationStartSince: yup
      .date()
      .when(
        'registrationStartUntil',
        (registrationStartUntil: Date, schema: yup.DateSchema) => {
          if (schema.isType(registrationStartUntil)) {
            return schema.max(
              moment(registrationStartUntil)
                .subtract(1, 'seconds')
                .toDate(),
              `Ngày mở đăng ký bắt đầu phải trước ngày mở đăng ký kết thúc (${moment(
                registrationStartUntil,
              ).format('DD/MM/YYYY')})`,
            )
          }
        },
      ),
    registrationStartUntil: yup.date(),
    registrationEndSince: yup
      .date()
      .when(
        'registrationEndUntil',
        (registrationEndUntil: Date, schema: yup.DateSchema) => {
          if (schema.isType(registrationEndUntil)) {
            return schema.max(
              moment(registrationEndUntil)
                .subtract(1, 'seconds')
                .toDate(),
              `Ngày đóng đăng ký bắt đầu phải trước ngày đóng đăng ký kết thúc (${moment(
                registrationEndUntil,
              ).format('DD/MM/YYYY')})`,
            )
          }
        },
      ),
    registrationEndUntil: yup.date(),
    offset: yup
      .number()
      .min(0, 'Số lượng bỏ qua phải là một số nguyên lớn hơn hoặc bằng 0')
      .default(0),
    limit: yup
      .number()
      .positive('Giới hạn số lượng phải là số nguyên dương')
      .default(10),
    orderBy: yup
      .string()
      .trim()
      .ensure()
      .strict(true)
      .oneOf(
        MEAL_PERIOD_ORDER_BY,
        `Thứ tự sắp xếp phải là một trong các thứ tự sau ${MEAL_PERIOD_ORDER_BY.join(
          ', ',
        )}`,
      )
      .default('reverse_registrationStartsAt'),
  })
  .required()

export const getMealPeriodInputValidation = yup
  .object()
  .shape({
    mealPeriodId: yup
      .string()
      .ensure()
      .trim()
      .strict(true)
      .required('Mã buổi ăn không được để trống'),
  })
  .required()
