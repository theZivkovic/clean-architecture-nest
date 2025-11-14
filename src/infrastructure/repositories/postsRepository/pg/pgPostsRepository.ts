import { Injectable } from '@nestjs/common'
import { PgPost } from './pgPost'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { Post } from 'src/core/models/post'

@Injectable()
export class PgPostsRepository implements IPostsRepository {
  constructor(@InjectRepository(PgPost) private readonly pgPostsRepository: Repository<PgPost>) {}

  async save(post: Post): Promise<Post> {
    await this.pgPostsRepository.save(PgPost.fromPost(post))
    return post
  }

  async getById(id: string): Promise<Post | undefined> {
    return (await this.pgPostsRepository.findOneBy({ id }))?.toPost()
  }

  async getByUserId(userId: string): Promise<Array<Post>> {
    return (await this.pgPostsRepository.findBy({ userId })).map((x) => x.toPost())
  }

  async countByUserId(userId: string): Promise<number> {
    return await this.pgPostsRepository.countBy({ userId })
  }
}
