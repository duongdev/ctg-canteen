import { GET_DISHES_SORT_BY } from 'functions/dishes/dish.types'
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

export const getDishesValidation = yup.object().shape({
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
      GET_DISHES_SORT_BY,
      `sortBy phải là một trong ${GET_DISHES_SORT_BY.join(', ')}`,
    )
    .default('reverse_createdAt'),
})
