import { Post } from 'src/core/models/post'

export interface IPostsRepository {
  save: (post: Post) => Promise<Post>
  getById: (id: string) => Promise<Post | undefined>
  getByUserId: (userId: string) => Promise<Array<Post>>
  countByUserId: (userId: string) => Promise<number>
}

export const IPostsRepository = Symbol('IPostsRepository')
