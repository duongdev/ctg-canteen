import IUser from 'interfaces/User'
import { Document, model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const User = model<IUser & Document>('User', userSchema)

export default User
