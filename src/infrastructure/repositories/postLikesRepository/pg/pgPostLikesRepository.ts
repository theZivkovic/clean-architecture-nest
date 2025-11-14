import { Injectable } from '@nestjs/common'
import { PgPostLike } from './pgPostLike'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PostLike } from 'src/core/models/postLike'

@Injectable()
export class PgPostLikesRepository implements IPostLikesRepository {
  constructor(
    @InjectRepository(PgPostLike) private readonly pgPostLikesRepository: Repository<PgPostLike>
  ) {}
  async save(postLike: PostLike): Promise<PostLike> {
    await this.pgPostLikesRepository.save(PgPostLike.fromPostLike(postLike))
    return postLike
  }

  async get(postId: string, byUserId: string): Promise<PostLike | undefined> {
    return (await this.pgPostLikesRepository.findOneBy({ postId, userId: byUserId }))?.toPostLike()
  }

  async delete(postId: string, userId: string): Promise<void> {
    await this.pgPostLikesRepository.delete({ postId, userId: userId })
  }
}
