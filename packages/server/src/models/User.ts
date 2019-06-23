import { createSchema } from 'helpers/mongoose'
import IUser from 'interfaces/User'
import { Document, model, Types } from 'mongoose'

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
    group: {
      type: String,
      required: true,
      enum: ['boarding', 'outpatient', 'semi-boarding', 'teacher', 'other'],
      default: 'other',
    },
    boardingRoom: { type: String },
    class: { type: String },
    roles: {
      type: [
        {
          type: String,
          enum: ['admin', 'student', 'deactivated'],
        },
      ],
      required: true,
      index: true,
      default: ['student'],
    },
    checker: {
      id: {
        type: String,
        unique: true,
        index: true,
        required: true,
      },
      name: String,
      card: String,
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
