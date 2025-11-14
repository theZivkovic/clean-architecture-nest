import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { MongoosePost } from './mongoosePost'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { Post } from 'src/core/models/post'

@Injectable()
export class MongoosePostsRepository implements IPostsRepository {
  constructor(@InjectModel(MongoosePost.name) private mongoosePost: Model<MongoosePost>) {}

  async save(post: Post): Promise<Post> {
    const document = await this.mongoosePost.findByIdAndUpdate(
      post.id,
      MongoosePost.fromPost(post),
      {
        upsert: true,
        new: true,
      }
    )
    return MongoosePost.toPost(document)!
  }
  async getById(id: string): Promise<Post | undefined> {
    return MongoosePost.toPost(await this.mongoosePost.findById(id))
  }
  async getByUserId(userId: string): Promise<Array<Post>> {
    return (await this.mongoosePost.find({ userId })).map((x) => MongoosePost.toPost(x)!)
  }
  async countByUserId(userId: string): Promise<number> {
    return await this.mongoosePost.countDocuments({ userId })
  }
}
