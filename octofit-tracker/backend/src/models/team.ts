import { model, Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

export const Team = model('Team', teamSchema)