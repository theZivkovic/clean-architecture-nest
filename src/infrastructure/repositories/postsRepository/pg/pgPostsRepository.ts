import { Injectable } from '@nestjs/common'
import { PgPost } from './pgPost'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { Post } from 'src/core/models/post'
import { ITransaction } from 'src/core/transactions/transaction'
import { BasePgRepository } from '../../basePgRepository'

@Injectable()
export class PgPostsRepository extends BasePgRepository<PgPost> implements IPostsRepository {
  constructor(@InjectRepository(PgPost) private readonly pgPostsRepository: Repository<PgPost>) {
    super(pgPostsRepository, PgPost)
  }

  async save(post: Post, transaction: ITransaction | undefined): Promise<Post> {
    await this.getRepository(transaction).save(PgPost.fromPost(post))
    return post
  }

  async getById(id: string, transaction: ITransaction | undefined): Promise<Post | undefined> {
    return (await this.getRepository(transaction).findOneBy({ id }))?.toPost()
  }

  async getByUserId(userId: string, transaction: ITransaction | undefined): Promise<Array<Post>> {
    return (await this.getRepository(transaction).findBy({ userId })).map((x) => x.toPost())
  }

  async countByUserId(userId: string, transaction: ITransaction | undefined): Promise<number> {
    return this.getRepository(transaction).countBy({ userId })
  }
}
