import { createSchema } from 'helpers/mongoose'
import IUser from 'interfaces/User'
import { Document, model } from 'mongoose'

const userSchema = createSchema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const User = model<IUser & Document & { password: string }>('User', userSchema)

export default User
