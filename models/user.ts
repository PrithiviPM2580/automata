import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  image: string
  googleAccessToken: string
  googleRefreshToken: string
  googleId: string
  stripeCustomerId: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    googleAccessToken: {
      type: String,
      required: false,
    },
    googleRefreshToken: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User
