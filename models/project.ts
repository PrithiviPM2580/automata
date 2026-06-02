import mongoose, { Document, Schema } from "mongoose"

export interface IProject extends Document {
  name: string
  userId: mongoose.Types.ObjectId
  status?: string
  trigger?: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectInput {
  name: string
  userId: string
  status?: string
  trigger?: string
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    trigger: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema)

export default Project
