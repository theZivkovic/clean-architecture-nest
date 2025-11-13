import { Module } from '@nestjs/common'
import { UsersController } from './presentation/users/users.controller'
import { UsersService } from './presentation/users/users.service'
import { IUsersRepository } from './core/interfaces/repositories/usersRepository'
import { InMemoryUsersRepository } from './infrastructure/repositories/usersRepository/inmemory/inMemoryUsersRepository'
import { CacheModule } from '@nestjs/cache-manager'
import { IIDGenerator } from './core/interfaces/idGenerator'
import { UUIDIDGenerator } from './infrastructure/uuidIdGenerator'
import { CreatePostUseCase } from './application/useCases/createPost'
import { IPostsRepository } from './core/interfaces/repositories/postsRepository'
import { InMemoryPostsRepository } from './infrastructure/repositories/postsRepository/inmemory/inMemoryPostsRepository'
import { PostsService } from './presentation/posts/posts.service'
import { PostsController } from './presentation/posts/posts.controller'
import { CreateUserUserCase } from './application/useCases/createUser'
import { GetUserByIdUseCase } from './application/useCases/getUserById'
import { GetUsersUseCase } from './application/useCases/getUsers'
import { GetUserPostsUseCase } from './application/useCases/getUserPosts'

@Module({
  imports: [CacheModule.register()],
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
      useClass: InMemoryUsersRepository,
    },
    {
      provide: IPostsRepository,
      useClass: InMemoryPostsRepository,
    },
    {
      provide: IIDGenerator,
      useClass: UUIDIDGenerator,
    },
  ],
})
export class AppModule {}
