import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PostLike } from 'src/core/models/postLike'
import { MongoosePostLike } from './mongoosePostLike'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ITransaction } from 'src/core/transactions/transaction'
import { MongooseTransaction } from 'src/infrastructure/transactions/mongo/mongooseTransactions'
import { BaseMongoRepository } from '../../baseMongoRepository'
import { OptimisticLockError } from 'src/core/errors/optimisticLockError'

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
    const existingPostLike = await this.mongoosePostLike
      .findOne(
        { userId: postLike.userId, postId: postLike.postId },
        {},
        { session: this.getSession(transaction) }
      )
      .lean()

    if (!existingPostLike) {
      await this.mongoosePostLike.create([MongoosePostLike.fromPostLike(postLike)], {
        session: this.getSession(transaction),
      })
      return postLike
    }

    const updatedPostLike = await this.mongoosePostLike.findOneAndUpdate(
      { postId: postLike.postId, userId: postLike.userId, __v: existingPostLike.__v },
      {
        $set: MongoosePostLike.fromPostLike(postLike),
        $inc: { __v: 1 },
      },
      { new: true, session: this.getSession(transaction) }
    )

    if (!updatedPostLike) {
      throw new OptimisticLockError()
    }

    return MongoosePostLike.toPostLike(updatedPostLike)!
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
    const existingPostLike = await this.mongoosePostLike
      .findOne({ userId: userId, postId: postId }, {}, { session: this.getSession(transaction) })
      .lean()

    if (!existingPostLike) {
      throw new NotFoundException()
    }

    const deletePostLike = await this.mongoosePostLike
      .deleteOne({ postId, userId: userId, __v: existingPostLike.__v })
      .session(this.getSession(transaction))

    if (!deletePostLike) {
      throw new OptimisticLockError()
    }
  }
}
