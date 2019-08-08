import { getSchemaOptions } from 'helpers/mongoose'
import { InstanceType, prop, Typegoose } from 'typegoose'

class Checker extends Typegoose {
  @prop({ index: true, required: true, unique: true })
  id: string

  @prop()
  name?: string

  @prop()
  card?: string
}

export type IChecker = InstanceType<Checker>

const CheckerModel = new Checker().getModelForClass(Checker, {
  schemaOptions: getSchemaOptions(),
})

export default CheckerModel
