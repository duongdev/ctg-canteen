import moment from 'moment'
import * as yup from 'yup'

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
