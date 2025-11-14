import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'
import { Post } from 'src/core/models/post'

@Schema({ collection: 'posts' })
export class MongoosePost {
  @Prop({ type: MongooseSchema.Types.String })
  _id: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  body: string

  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  likeCount: number

  static toPost(obj: any): Post | undefined {
    return !obj
      ? undefined
      : Post.fromFields({
          id: obj._id.toString(),
          title: obj.title,
          body: obj.body,
          userId: obj.userId,
          likeCount: obj.likeCount,
        })
  }

  static fromPost(post: Post): MongoosePost {
    const result = new MongoosePost()
    result.title = post.title
    result.body = post.body
    result.userId = post.userId
    result.likeCount = post.likeCount
    result._id = post.id
    return result
  }
}

export const MongoosePostSchema = SchemaFactory.createForClass(MongoosePost)
