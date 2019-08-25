import * as yup from 'yup'

export const createDishInputValidation = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .ensure()
      .required('Tên món ăn không được để trống'),
    images: yup
      .array(
        yup
          .string()
          .trim()
          .ensure(),
      )
      .default([]),
    price: yup
      .number()
      .integer('Giá món ăn phải là một số nguyên')
      .positive('Giá món ăn phải lớn hơn hoặc bằng 0')
      .required('Giá món ăn không được để trống'),
  })
  .required()
