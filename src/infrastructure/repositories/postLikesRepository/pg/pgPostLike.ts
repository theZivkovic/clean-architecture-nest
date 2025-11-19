import { PostLike } from 'src/core/models/postLike'
import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm'

@Entity('postLikes')
export class PgPostLike {
  @PrimaryColumn()
  postId: string

  @PrimaryColumn()
  userId: string

  @VersionColumn()
  version: number

  toPostLike(): PostLike {
    return PostLike.create({
      userId: this.userId,
      postId: this.postId,
      version: this.version,
    })
  }

  static fromPostLike(postLike: PostLike) {
    const pgPostLike = new PgPostLike()
    pgPostLike.postId = postLike.postId
    pgPostLike.userId = postLike.userId
    pgPostLike.version = postLike.version
    return pgPostLike
  }
}
