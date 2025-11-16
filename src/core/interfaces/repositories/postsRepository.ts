import { Post } from 'src/core/models/post'
import { ITransaction } from 'src/core/transactions/transaction'

export interface IPostsRepository {
  save: (post: Post, transaction: ITransaction | undefined) => Promise<Post>
  getById: (id: string, transaction: ITransaction | undefined) => Promise<Post | undefined>
  getByUserId: (userId: string, transaction: ITransaction | undefined) => Promise<Array<Post>>
  countByUserId: (userId: string, transaction: ITransaction | undefined) => Promise<number>
}

export const IPostsRepository = Symbol('IPostsRepository')
