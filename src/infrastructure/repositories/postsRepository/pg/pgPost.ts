import { Post } from 'src/core/models/post'
import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm'

@Entity('posts')
export class PgPost {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'varchar', length: 255 })
  body: string

  @Column({ type: 'varchar', length: 36 })
  userId: string

  @Column({ type: 'integer' })
  likeCount: number

  @VersionColumn()
  version: number

  toPost(): Post {
    return Post.fromFields({
      id: this.id,
      title: this.title,
      body: this.body,
      userId: this.userId,
      likeCount: this.likeCount,
      version: this.version,
    })
  }

  static fromPost(post: Post) {
    const pgPost = new PgPost()
    pgPost.id = post.id
    pgPost.title = post.title
    pgPost.body = post.body
    pgPost.userId = post.userId
    pgPost.likeCount = post.likeCount
    pgPost.version = post.version
    return pgPost
  }
}
