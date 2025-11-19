import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { PostLike } from 'src/core/models/postLike'

@Schema({ collection: 'postLikes' })
export class MongoosePostLike {
  @Prop({ required: true })
  postId: string

  @Prop({ required: true })
  userId: string

  static toPostLike(obj: any): PostLike | undefined {
    return !obj
      ? undefined
      : PostLike.create({
          userId: obj.userId,
          postId: obj.postId,
          version: obj.__v,
        })
  }

  static fromPostLike(postLike: PostLike): MongoosePostLike {
    const result = new MongoosePostLike()
    result.postId = postLike.postId
    result.userId = postLike.userId
    return result
  }
}

export const MongoosePostLikeSchema = SchemaFactory.createForClass(MongoosePostLike)
