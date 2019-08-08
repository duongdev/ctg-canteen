import { arrayProp, InstanceType, prop, Typegoose } from 'typegoose'

import { getSchemaOptions } from 'helpers/mongoose'

class Checker extends Typegoose {
  @prop({ index: true, required: true, unique: true })
  id: string

  @prop()
  name?: string

  @prop()
  card?: string
}

export class User extends Typegoose {
  @prop({ index: true, unique: true, required: true })
  studentId: string

  @prop({ required: true })
  name: string

  @prop({ required: true })
  birthday: Date

  @prop({ required: true })
  hometown: string

  @prop({ required: true })
  sex: string

  @prop({ required: true })
  schoolYear: number

  @prop({
    required: true,
    default: 'other',
    enum: ['boarding', 'outpatient', 'semi-boarding', 'teacher', 'other'],
  })
  group: string

  @prop()
  boardingRoom?: string

  @prop()
  class?: string

  @arrayProp({
    required: true,
    index: true,
    items: String,
    default: ['student'],
    enum: ['admin', 'student', 'deactivated'],
  })
  roles: string[]

  @prop({ index: true })
  checker: Checker

  @prop({ required: true })
  password: string
}

export type IUser = InstanceType<User>

const UserModel = new User().getModelForClass(User, {
  schemaOptions: getSchemaOptions(),
})

export default UserModel
