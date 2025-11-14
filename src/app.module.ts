import { Module } from '@nestjs/common'
import { UsersController } from './presentation/users/users.controller'
import { UsersService } from './presentation/users/users.service'
import { IUsersRepository } from './core/interfaces/repositories/usersRepository'
import { CacheModule } from '@nestjs/cache-manager'
import { IIDGenerator } from './core/interfaces/idGenerator'
import { UUIDIDGenerator } from './infrastructure/uuidIdGenerator'
import { CreatePostUseCase } from './application/useCases/createPost'
import { IPostsRepository } from './core/interfaces/repositories/postsRepository'
import { PostsService } from './presentation/posts/posts.service'
import { PostsController } from './presentation/posts/posts.controller'
import { CreateUserUserCase } from './application/useCases/createUser'
import { GetUserByIdUseCase } from './application/useCases/getUserById'
import { GetUsersUseCase } from './application/useCases/getUsers'
import { GetUserPostsUseCase } from './application/useCases/getUserPosts'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgUsersRepository } from './infrastructure/repositories/usersRepository/pg/pgUsersRepository'
import { PgPostsRepository } from './infrastructure/repositories/postsRepository/pg/pgPostsRepository'
import { PgUser } from './infrastructure/repositories/usersRepository/pg/pgUser'
import { PgPost } from './infrastructure/repositories/postsRepository/pg/pgPost'

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'arch123!',
      username: 'clean',
      entities: [PgUser, PgPost],
      database: 'clean-arch-postgres-db',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([PgPost, PgUser]),
  ],
  controllers: [UsersController, PostsController],
  providers: [
    UsersService,
    PostsService,
    CreatePostUseCase,
    CreateUserUserCase,
    GetUserByIdUseCase,
    GetUsersUseCase,
    GetUserPostsUseCase,
    UUIDIDGenerator,
    {
      provide: IUsersRepository,
      useClass: PgUsersRepository,
    },
    {
      provide: IPostsRepository,
      useClass: PgPostsRepository,
    },
    {
      provide: IIDGenerator,
      useClass: UUIDIDGenerator,
    },
    PgUsersRepository,
    PgPostsRepository,
  ],
})
export class AppModule {}
