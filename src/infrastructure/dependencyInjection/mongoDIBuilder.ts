import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { BaseInfrastructureDIBuilder } from './infrastructureDIBuilder'
import { MongooseModule } from '@nestjs/mongoose'
import {
  MongooseUser,
  MongooseUserSchema,
} from '../repositories/usersRepository/mongo/mongooseUser'
import {
  MongoosePost,
  MongoosePostSchema,
} from '../repositories/postsRepository/mongo/mongoosePost'
import { MongoosePostLike } from '../repositories/postLikesRepository/mongo/mongoosePostLike'
import { MongoosePostLikeSchema } from '../repositories/postLikesRepository/mongo/mongoosePostLike'
import { MongooseUsersRepository } from '../repositories/usersRepository/mongo/mongooseUsersRepository'
import { MongoosePostsRepository } from '../repositories/postsRepository/mongo/mongoosePostsRepository'
import { MongoosePostLikesRepository } from '../repositories/postLikesRepository/mongo/mongoPostLikesRepository'

export class MongoDIBuilder extends BaseInfrastructureDIBuilder {
  buildImports() {
    return [
      ...super.buildImports(),
      MongooseModule.forRoot(
        (process.env.MONGO_URL as string) ||
          'mongodb://clean:arch123@127.0.0.1:27017/clean-arch-db?replicaSet=rs0&directConnection=true&authSource=admin'
      ),
      MongooseModule.forFeature([
        { name: MongooseUser.name, schema: MongooseUserSchema },
        { name: MongoosePost.name, schema: MongoosePostSchema },
        { name: MongoosePostLike.name, schema: MongoosePostLikeSchema },
      ]),
    ]
  }
  buildProviders() {
    return [
      ...super.buildProviders(),
      {
        provide: IUsersRepository,
        useClass: MongooseUsersRepository,
      },
      {
        provide: IPostsRepository,
        useClass: MongoosePostsRepository,
      },
      {
        provide: IPostLikesRepository,
        useClass: MongoosePostLikesRepository,
      },
      MongooseUsersRepository,
      MongoosePostsRepository,
      MongoosePostLikesRepository,
    ]
  }
}
