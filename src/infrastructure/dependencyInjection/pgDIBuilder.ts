import { TypeOrmModule } from '@nestjs/typeorm'
import { PgUser } from '../repositories/usersRepository/pg/pgUser'
import { PgPost } from '../repositories/postsRepository/pg/pgPost'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { PgUsersRepository } from '../repositories/usersRepository/pg/pgUsersRepository'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { PgPostsRepository } from '../repositories/postsRepository/pg/pgPostsRepository'

import { PgPostLike } from '../repositories/postLikesRepository/pg/pgPostLike'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { PgPostLikesRepository } from '../repositories/postLikesRepository/pg/pgPostLikesRepository'
import { BaseInfrastructureDIBuilder } from './infrastructureDIBuilder'

export class PgDIBuilder extends BaseInfrastructureDIBuilder {
  buildImports() {
    return [
      ...super.buildImports(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: 'postgres://clean:arch123@localhost:5432/clean-arch-db',
        entities: [PgUser, PgPost, PgPostLike],
        synchronize: true,
        logging: true,
      }),
      TypeOrmModule.forFeature([PgPost, PgUser, PgPostLike]),
    ]
  }
  buildProviders() {
    return [
      ...super.buildProviders(),
      {
        provide: IUsersRepository,
        useClass: PgUsersRepository,
      },
      {
        provide: IPostsRepository,
        useClass: PgPostsRepository,
      },
      {
        provide: IPostLikesRepository,
        useClass: PgPostLikesRepository,
      },
      PgUsersRepository,
      PgPostsRepository,
      PgPostLikesRepository,
    ]
  }
}
