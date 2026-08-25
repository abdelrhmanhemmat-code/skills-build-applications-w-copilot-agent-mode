import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profile: {
      grade: { type: Number, required: true },
      avatar: { type: String, required: true },
    },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)