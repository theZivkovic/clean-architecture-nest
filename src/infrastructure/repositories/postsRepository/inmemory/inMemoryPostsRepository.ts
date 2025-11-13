import { Injectable } from '@nestjs/common'
import { Post } from 'src/core/models/post'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'

@Injectable()
export class InMemoryPostsRepository implements IPostsRepository {
  private postsMap: Map<string, Post>

  constructor() {
    this.postsMap = new Map<string, Post>()
  }

  countByUserId(userId: string): Promise<number> {
    return Promise.resolve(
      Array.from(this.postsMap.values()).filter((x) => x.userId === userId).length
    )
  }

  getByUserId(userId: string): Promise<Array<Post>> {
    return Promise.resolve(Array.from(this.postsMap.values()).filter((x) => x.userId === userId))
  }

  async getById(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.postsMap.get(id))
  }

  async save(post: Post): Promise<Post> {
    this.postsMap.set(post.id, post)
    return post
  }
}
