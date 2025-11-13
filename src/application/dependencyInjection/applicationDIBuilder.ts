import { DynamicModule, Provider } from '@nestjs/common'
import { CreatePostUseCase } from '../useCases/createPost'
import { CreateUserUserCase } from '../useCases/createUser'
import { GetUserByIdUseCase } from '../useCases/getUserById'
import { GetUserPostsUseCase } from '../useCases/getUserPosts'
import { GetUsersUseCase } from '../useCases/getUsers'
import { LikePostUseCase } from '../useCases/likePost'
import { UnlikePostUseCase } from '../useCases/unlikePost'

export class ApplicationDIBuilder {
  buildImports(): Array<DynamicModule> {
    return []
  }
  buildProviders(): Array<Provider> {
    return [
      CreatePostUseCase,
      CreateUserUserCase,
      GetUserByIdUseCase,
      GetUserPostsUseCase,
      GetUsersUseCase,
      LikePostUseCase,
      UnlikePostUseCase,
    ]
  }
}
