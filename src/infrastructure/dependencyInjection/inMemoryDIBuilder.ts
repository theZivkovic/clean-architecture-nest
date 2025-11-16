import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { ITransactionFactory } from 'src/core/transactions/transaction'
import { InMemoryUsersRepository } from '../repositories/usersRepository/inmemory/inMemoryUsersRepository'
import { InMemoryPostsRepository } from '../repositories/postsRepository/inmemory/inMemoryPostsRepository'
import { InMemoryTransactionFactory } from '../transactions/inmemory/inMemoryTransactions'
import { BaseInfrastructureDIBuilder } from './infrastructureDIBuilder'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { InMemoryPostLikesRepository } from '../repositories/postLikesRepository/inmemory/inMemoryPostLikesRepository'

export class InMemoryDIBuilder extends BaseInfrastructureDIBuilder {
  buildImports() {
    return [...super.buildImports()]
  }
  override buildProviders() {
    return [
      ...super.buildProviders(),
      {
        provide: IUsersRepository,
        useClass: InMemoryUsersRepository,
      },
      {
        provide: IPostsRepository,
        useClass: InMemoryPostsRepository,
      },
      {
        provide: IPostLikesRepository,
        useClass: InMemoryPostLikesRepository,
      },
      {
        provide: ITransactionFactory,
        useClass: InMemoryTransactionFactory,
      },
      InMemoryUsersRepository,
      InMemoryPostsRepository,
      InMemoryPostLikesRepository,
    ]
  }
}
