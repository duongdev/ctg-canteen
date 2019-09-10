import { getSchemaOptions } from 'helpers/mongoose'
import moment from 'moment'
import { InstanceType, prop, Ref, Typegoose } from 'typegoose'
import { User } from './User'

moment.locale('vi')

export class MealPeriod extends Typegoose {
  @prop({ default: '' })
  name: string

  @prop({ required: true })
  registrationStartsAt: Date

  @prop({ required: true })
  registrationEndsAt: Date

  @prop({ required: true, ref: User })
  createdByUserId: Ref<User>
}

export type IMealPeriod = InstanceType<MealPeriod>

const MealPeriodModel = new MealPeriod().getModelForClass(MealPeriod, {
  schemaOptions: getSchemaOptions(),
})

export default MealPeriodModel
