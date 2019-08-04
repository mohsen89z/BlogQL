import { Post } from 'src/models/Post.schema'
import { PostFilter, IPost } from '@Types'

export const findById = (id: string) => Post.findById(id)

export const getPosts = ({
  author,
  pagination: { page, limit },
}: PostFilter): Promise<IPost[]> =>
  Post.find(author ? { author } : {})
    .limit(limit)
    .skip(page)
    .exec()
