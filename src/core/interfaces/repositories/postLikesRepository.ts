import { PostLike } from 'src/core/models/postLike'

export interface IPostLikesRepository {
  save: (post: PostLike) => Promise<PostLike>
  get: (postId: string, byUserId: string) => Promise<PostLike | undefined>
  delete: (postId: string, userId: string) => Promise<void>
}

export const IPostLikesRepository = Symbol('IPostLikesRepository')
