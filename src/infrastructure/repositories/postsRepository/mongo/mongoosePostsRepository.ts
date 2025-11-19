import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { MongoosePost } from './mongoosePost'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { Post } from 'src/core/models/post'
import { ITransaction } from 'src/core/transactions/transaction'
import { MongooseTransaction } from 'src/infrastructure/transactions/mongo/mongooseTransactions'
import { BaseMongoRepository } from '../../baseMongoRepository'

@Injectable()
export class MongoosePostsRepository extends BaseMongoRepository implements IPostsRepository {
  constructor(@InjectModel(MongoosePost.name) private mongoosePost: Model<MongoosePost>) {
    super()
  }

  async save(post: Post, transaction: ITransaction | undefined): Promise<Post> {
    const document = await this.mongoosePost.findByIdAndUpdate(
      post.id,
      MongoosePost.fromPost(post),
      {
        upsert: true,
        new: true,
        session: this.getSession(transaction),
      }
    )
    return MongoosePost.toPost(document)!
  }
  async getById(id: string, transaction: ITransaction | undefined): Promise<Post | undefined> {
    return MongoosePost.toPost(
      await this.mongoosePost.findById(id).session(this.getSession(transaction))
    )
  }
  async getByUserId(userId: string, transaction: ITransaction | undefined): Promise<Array<Post>> {
    return (await this.mongoosePost.find({ userId }).session(this.getSession(transaction))).map(
      (x) => MongoosePost.toPost(x)!
    )
  }
  async countByUserId(userId: string, transaction: ITransaction | undefined): Promise<number> {
    return await this.mongoosePost.countDocuments({ userId }).session(this.getSession(transaction))
  }
}
