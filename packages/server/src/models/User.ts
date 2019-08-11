import { arrayProp, InstanceType, prop, Typegoose } from 'typegoose'

import { getSchemaOptions } from 'helpers/mongoose'
import { USER_GROUPS } from 'utils/constants'

export class User extends Typegoose {
  /** User does not have studentId if user roles is not student */
  @prop({ index: true, unique: true })
  studentId: string

  @prop({ index: true, required: true, unique: true })
  username: string

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
    enum: USER_GROUPS,
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
  checkerId: string

  @prop({ required: true })
  password: string
}

export type IUser = InstanceType<User>

const UserModel = new User().getModelForClass(User, {
  schemaOptions: getSchemaOptions(),
})

export default UserModel
