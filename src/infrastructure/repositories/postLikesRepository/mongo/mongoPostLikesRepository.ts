import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PostLike } from 'src/core/models/postLike'
import { MongoosePostLike } from './mongoosePostLike'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class MongoosePostLikesRepository implements IPostLikesRepository {
  constructor(
    @InjectModel(MongoosePostLike.name) private mongoosePostLike: Model<MongoosePostLike>
  ) {}
  async save(postLike: PostLike): Promise<PostLike> {
    const document = await this.mongoosePostLike.findOneAndUpdate(
      {
        userId: postLike.userId,
        postId: postLike.postId,
      },
      {
        userId: postLike.userId,
        postId: postLike.postId,
      },
      {
        upsert: true,
        new: true,
      }
    )
    return MongoosePostLike.toPostLike(document)!
  }

  async get(postId: string, byUserId: string): Promise<PostLike | undefined> {
    return MongoosePostLike.toPostLike(
      await this.mongoosePostLike.findOne({ postId, userId: byUserId })
    )
  }

  async delete(postId: string, userId: string): Promise<void> {
    await this.mongoosePostLike.deleteOne({ postId, userId: userId })
  }
}
