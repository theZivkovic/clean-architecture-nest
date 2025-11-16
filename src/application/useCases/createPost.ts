import { Inject, Injectable } from '@nestjs/common'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { Post } from 'src/core/models/post'
import { ClassFields } from 'src/core/utils/classFields'
import { IIDGenerator } from 'src/core/interfaces/idGenerator'
import { IUseCase } from './useCase'
import { UserPostsLimitExceeded } from 'src/core/errors/userPostLimitExceeded'
import { failure, Result, success } from '../utils/result'
import { CoreError } from 'src/core/errors/coreError'
import { UserWithIdNotFound } from 'src/core/errors/userWithIdNotFound'
import { UnitOfWork } from '../utils/unitOfWork'

@Injectable()
export class CreatePostUseCase implements IUseCase<Omit<ClassFields<Post>, 'id'>, Post> {
  private static MAX_POSTS_PER_USER = 2

  constructor(
    private readonly unitOfWork: UnitOfWork,
    @Inject(IPostsRepository)
    private readonly postsRepository: IPostsRepository,
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
    @Inject(IIDGenerator) private readonly idGenerator: IIDGenerator
  ) {}

  async execute(postRequest: Omit<ClassFields<Post>, 'id' | 'likeCount'>): Promise<Result<Post>> {
    const user = await this.usersRepository.getById(postRequest.userId, undefined)

    if (!user) {
      return failure(new UserWithIdNotFound(postRequest.userId))
    }

    const postCount = await this.postsRepository.countByUserId(user.id, undefined)

    if (postCount >= CreatePostUseCase.MAX_POSTS_PER_USER) {
      return failure(new UserPostsLimitExceeded(user.id))
    }

    try {
      const newPost = Post.create(
        {
          title: postRequest.title,
          body: postRequest.body,
          userId: user.id,
        },
        this.idGenerator
      )

      return success(await this.postsRepository.save(newPost, undefined))
    } catch (err) {
      if (err instanceof CoreError) {
        return failure(err)
      }
      throw err
    }
  }
}
