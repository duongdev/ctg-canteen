import { getSchemaOptions } from 'helpers/mongoose'
import { MealPeriod } from 'models/MealPeriod'
import { arrayProp, InstanceType, prop, Ref, Typegoose } from 'typegoose'
import { tuple } from 'utils/tuple'
import { User } from './User'

export const MEAL_TYPES = tuple(['breakfast', 'lunch', 'dinner'])

export class Meal extends Typegoose {
  @prop({ required: true, index: true, ref: MealPeriod })
  mealPeriodId: Ref<MealPeriod>
  @prop({ required: true, index: true, enum: MEAL_TYPES })
  type: string

  @arrayProp({ required: true, items: String })
  dishIds: string[]

  @prop({ required: true })
  date: Date

  @prop({ required: true, ref: User })
  createdByUserId: Ref<User>
}

export type IMeal = InstanceType<Meal>

const MealModel = new Meal().getModelForClass(Meal, {
  schemaOptions: getSchemaOptions(),
})
export default MealModel
