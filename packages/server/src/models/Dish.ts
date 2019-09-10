import { getSchemaOptions } from 'helpers/mongoose'
import { InstanceType, prop, Typegoose } from 'typegoose'

export class Dish extends Typegoose {
  @prop({ required: true })
  name: string

  @prop({ default: [] })
  images: string[]

  @prop({ required: true })
  price: number
}

export type IDish = InstanceType<Dish>

const DishModel = new Dish().getModelForClass(Dish, {
  schemaOptions: getSchemaOptions(),
})
export default DishModel
