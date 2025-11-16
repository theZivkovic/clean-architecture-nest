import { PostLike } from 'src/core/models/postLike'
import { ITransaction } from 'src/core/transactions/transaction'

export interface IPostLikesRepository {
  save: (post: PostLike, transaction: ITransaction | undefined) => Promise<PostLike>
  get: (
    postId: string,
    byUserId: string,
    transaction: ITransaction | undefined
  ) => Promise<PostLike | undefined>
  delete: (postId: string, userId: string, transaction: ITransaction | undefined) => Promise<void>
}

export const IPostLikesRepository = Symbol('IPostLikesRepository')
