import { CacheModule } from '@nestjs/cache-manager'
import { DynamicModule, Provider } from '@nestjs/common'
import { UsersController } from '../users/users.controller'
import { PostsController } from '../posts/posts.controller'
import { UsersService } from '../users/users.service'
import { PostsService } from '../posts/posts.service'

export class PresentationDIBuilder {
  buildImports(): Array<DynamicModule> {
    return [CacheModule.register()]
  }
  buildProviders(): Array<Provider> {
    return [UsersService, PostsService]
  }
  buildControllers() {
    return [UsersController, PostsController]
  }
}
