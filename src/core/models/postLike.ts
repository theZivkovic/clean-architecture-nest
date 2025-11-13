import { ClassFields } from '../utils/classFields'

export class PostLike {
  postId: string
  userId: string

  private constructor(postId: string, userId: string) {
    this.postId = postId
    this.userId = userId
  }

  static create(postLike: ClassFields<PostLike>): PostLike {
    return new PostLike(postLike.postId, postLike.userId)
  }
}
