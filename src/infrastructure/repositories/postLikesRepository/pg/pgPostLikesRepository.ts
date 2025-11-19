import { Injectable, Post } from '@nestjs/common'
import { PgPostLike } from './pgPostLike'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PostLike } from 'src/core/models/postLike'
import { ITransaction } from 'src/core/transactions/transaction'
import { BasePgRepository } from '../../basePgRepository'

@Injectable()
export class PgPostLikesRepository
  extends BasePgRepository<PgPostLike>
  implements IPostLikesRepository
{
  constructor(
    @InjectRepository(PgPostLike) private readonly pgPostLikesRepository: Repository<PgPostLike>
  ) {
    super(pgPostLikesRepository, PgPostLike)
  }

  async save(postLike: PostLike, transaction: ITransaction | undefined): Promise<PostLike> {
    await this.executeWithOptimisticLockHandling(() =>
      this.getRepository(transaction).save(PgPostLike.fromPostLike(postLike))
    )
    return postLike
  }

  async get(
    postId: string,
    byUserId: string,
    transaction: ITransaction | undefined
  ): Promise<PostLike | undefined> {
    return (
      await this.getRepository(transaction).findOneBy({ postId, userId: byUserId })
    )?.toPostLike()
  }

  async delete(
    postId: string,
    userId: string,
    transaction: ITransaction | undefined
  ): Promise<void> {
    await this.executeWithOptimisticLockHandling(() =>
      this.getRepository(transaction).delete({ postId, userId })
    )
  }
}
