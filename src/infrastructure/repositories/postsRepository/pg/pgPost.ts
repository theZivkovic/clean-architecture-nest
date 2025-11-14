import { Post } from 'src/core/models/post'
import { Column, Entity, PrimaryColumn } from 'typeorm'

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

  toPost(): Post {
    return Post.fromFields({
      id: this.id,
      title: this.title,
      body: this.body,
      userId: this.userId,
    })
  }

  static fromPost(post: Post) {
    const pgPost = new PgPost()
    pgPost.id = post.id
    pgPost.title = post.title
    pgPost.body = post.body
    pgPost.userId = post.userId
    return pgPost
  }
}
