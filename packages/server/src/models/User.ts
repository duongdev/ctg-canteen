import { arrayProp, InstanceType, prop, Ref, Typegoose } from 'typegoose'

import { getSchemaOptions } from 'helpers/mongoose'
import { tuple } from 'utils/tuple'

export const USER_SEX = tuple(['male', 'female'])
export type UserSex = typeof USER_SEX[number]

export const USER_GROUPS = tuple([
  'boarding',
  'outpatient',
  'semi-boarding',
  'teacher',
  'other',
])
export type UserGroup = typeof USER_GROUPS[number]

export const USER_ROLES = tuple(['admin', 'student', 'deactivated'])
export type UserRole = typeof USER_ROLES[number]

export const USER_CLASSES = tuple([
  'none',
  'math',
  'informatics',
  'physics',
  'chemistry',
  'biology',
  'english',
  'literature',
  'history',
  'geography',
  'normal',
])
export type UserClass = typeof USER_CLASSES[number]

export class User extends Typegoose {
  @prop({ index: true, required: true, unique: true })
  username: string

  @prop({ required: true })
  password: string

  @prop()
  name: string

  @prop()
  birthdate: Date

  @prop()
  hometown: string

  @prop({ enum: USER_SEX })
  sex: UserSex

  @prop()
  schoolYear: number

  @prop({
    default: 'other',
    enum: USER_GROUPS,
  })
  group: UserGroup

  @prop()
  boardingRoom?: string

  @prop({
    default: 'none',
    enum: USER_CLASSES,
  })
  class: UserClass

  @arrayProp({
    index: true,
    items: String,
    default: ['student'],
    enum: USER_ROLES,
  })
  roles: UserRole[]

  @prop({ index: true, unique: true, sparse: true })
  checkerId: string

  @prop({ ref: User })
  createdByUserId: Ref<User>
}

export type IUser = InstanceType<User>

const UserModel = new User().getModelForClass(User, {
  schemaOptions: getSchemaOptions(),
})

export default UserModel
