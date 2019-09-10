import { MEAL_TYPES } from 'models/Meal'
import * as yup from 'yup'

export const createMealInputValidation = yup
  .object()
  .shape({
    createdByUserId: yup
      .string()
      .trim()
      .ensure()
      .strict(true)
      .required('Mã người tạo không được để trống'),
    mealPeriodId: yup
      .string()
      .trim()
      .ensure()
      .strict(true)
      .required('Mã đợt ăn không được để trống'),
    type: yup
      .string()
      .trim()
      .ensure()
      .strict(true)
      .oneOf(
        MEAL_TYPES,
        `Buổi ăn phải là một trong các buổi sau ${MEAL_TYPES.join(', ')}`,
      )
      .required('Buổi ăn không được để trống'),
    date: yup
      .date()
      .strict(true)
      .required('Ngày ăn không được để trống'),
    dishIds: yup
      .array(
        yup
          .string()
          .trim()
          .ensure()
          .strict(true)
          .required(),
      )
      .min(1, 'Phải có ít nhất một món ăn')
      .required('Danh sách mã món ăn không được để trống'),
  })
  .required()
