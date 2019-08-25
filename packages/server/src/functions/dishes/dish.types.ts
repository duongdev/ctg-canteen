import { IDish } from 'models/Dish'
import { tuple } from 'utils/tuple'

export type CreateDishInput = {
  name: string
  images?: string[]
  price: number
}

export const GET_DISHES_SORT_BY = tuple([
  'reverse_createdAt',
  'createdAt',
  'price',
  'reverse_price',
])

export type GetDishesFilter = {
  sortBy?: typeof GET_DISHES_SORT_BY[number]
  limit?: number
  page?: number
}

export type GetDishesOutput = {
  total: number
  page: number
  pages: number
  limit: number
  edges: IDish[]
}
