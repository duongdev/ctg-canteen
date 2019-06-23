import IUser from 'interfaces/User'
import { Document, model, Schema } from 'mongoose'

const userSchema = new Schema(
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
