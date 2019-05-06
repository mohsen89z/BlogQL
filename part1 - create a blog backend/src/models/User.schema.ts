import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
)

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

export const User = mongoose.model('User', UserSchema)
