import { Injectable, Post } from '@nestjs/common'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PostLike } from 'src/core/models/postLike'

@Injectable()
export class InMemoryPostLikesRepository implements IPostLikesRepository {
  private postsToLikesByUsers: Map<string, Set<string>>

  constructor() {
    this.postsToLikesByUsers = new Map<string, Set<string>>()
  }
  save(postLike: PostLike): Promise<PostLike> {
    if (!this.postsToLikesByUsers.has(postLike.postId)) {
      this.postsToLikesByUsers.set(postLike.postId, new Set<string>())
    }
    this.postsToLikesByUsers.get(postLike.postId)?.add(postLike.userId)
    return Promise.resolve(postLike)
  }
  get(postId: string, byUserId: string): Promise<PostLike | undefined> {
    if (this.postsToLikesByUsers.get(postId)?.has(byUserId)) {
      return Promise.resolve(PostLike.create({ postId, userId: byUserId }))
    }
    return Promise.resolve(undefined)
  }
  delete(postId: string, userId: string): Promise<void> {
    if (!this.postsToLikesByUsers.has(postId)) {
      return Promise.resolve()
    }
    this.postsToLikesByUsers.get(postId)!.delete(userId)
    return Promise.resolve()
  }
}
