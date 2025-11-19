import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PostLike } from 'src/core/models/postLike'
import { MongoosePostLike } from './mongoosePostLike'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ITransaction } from 'src/core/transactions/transaction'
import { MongooseTransaction } from 'src/infrastructure/transactions/mongo/mongooseTransactions'
import { BaseMongoRepository } from '../../baseMongoRepository'

@Injectable()
export class MongoosePostLikesRepository
  extends BaseMongoRepository
  implements IPostLikesRepository
{
  constructor(
    @InjectModel(MongoosePostLike.name) private mongoosePostLike: Model<MongoosePostLike>
  ) {
    super()
  }

  async save(postLike: PostLike, transaction: ITransaction | undefined): Promise<PostLike> {
    const document = await this.mongoosePostLike.findOneAndUpdate(
      {
        userId: postLike.userId,
        postId: postLike.postId,
      },
      {
        userId: postLike.userId,
        postId: postLike.postId,
        version: postLike.version,
      },
      {
        upsert: true,
        new: true,
        session: this.getSession(transaction),
      }
    )
    return MongoosePostLike.toPostLike(document)!
  }

  async get(
    postId: string,
    byUserId: string,
    transaction: ITransaction | undefined
  ): Promise<PostLike | undefined> {
    return MongoosePostLike.toPostLike(
      await this.mongoosePostLike
        .findOne({ postId, userId: byUserId })
        .session(this.getSession(transaction))
    )
  }

  async delete(
    postId: string,
    userId: string,
    transaction: ITransaction | undefined
  ): Promise<void> {
    await this.mongoosePostLike
      .deleteOne({ postId, userId: userId })
      .session(this.getSession(transaction))
  }
}
