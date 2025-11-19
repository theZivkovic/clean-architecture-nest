import { ClassFields } from '../utils/classFields'

export class PostLike {
  postId: string
  userId: string
  version: number

  private constructor(postId: string, userId: string, version: number) {
    this.postId = postId
    this.userId = userId
    this.version = version
  }

  static create(postLike: ClassFields<PostLike>): PostLike {
    return new PostLike(postLike.postId, postLike.userId, postLike.version)
  }
}
