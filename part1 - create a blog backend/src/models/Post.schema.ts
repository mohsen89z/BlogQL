import * as mongoose from 'mongoose'
import { IPost } from '@Types'
const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    content: String,
    tags: [String],
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

export const Post = mongoose.model<IPost>('Post', PostSchema)
