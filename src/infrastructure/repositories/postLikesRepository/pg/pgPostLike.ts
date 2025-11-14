import { PostLike } from 'src/core/models/postLike'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('postLikes')
export class PgPostLike {
  @PrimaryColumn()
  postId: string

  @PrimaryColumn()
  userId: string

  toPostLike(): PostLike {
    return PostLike.create({
      userId: this.userId,
      postId: this.postId,
    })
  }

  static fromPostLike(postLike: PostLike) {
    const pgPostLike = new PgPostLike()
    pgPostLike.postId = postLike.postId
    pgPostLike.userId = postLike.userId
    return pgPostLike
  }
}
