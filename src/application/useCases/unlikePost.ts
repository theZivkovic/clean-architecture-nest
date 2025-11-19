import { Inject, Injectable } from '@nestjs/common'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { ClassFields } from 'src/core/utils/classFields'
import { IUseCase } from './useCase'
import { failure, Result, success } from '../utils/result'
import { CoreError } from 'src/core/errors/coreError'
import { UserWithIdNotFound } from 'src/core/errors/userWithIdNotFound'
import { PostLike } from 'src/core/models/postLike'
import { PostWithIdNotFound } from 'src/core/errors/postWithIdNotFound'
import { IPostLikesRepository } from 'src/core/interfaces/repositories/postLikesRepository'
import { UserLikesOwnPosts } from 'src/core/errors/userLikesOwnPosts'
import { UnitOfWork } from '../utils/unitOfWork'

@Injectable()
export class UnlikePostUseCase implements IUseCase<ClassFields<PostLike>, void> {
  constructor(
    @Inject(IPostsRepository)
    private readonly postsRepository: IPostsRepository,
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
    @Inject(IPostLikesRepository)
    private readonly postLikesRepository: IPostLikesRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  async execute(postUnlikeRequest: Omit<ClassFields<PostLike>, 'version'>): Promise<Result<void>> {
    const user = await this.usersRepository.getById(postUnlikeRequest.userId, undefined)

    if (!user) {
      return failure(new UserWithIdNotFound(postUnlikeRequest.userId))
    }

    const post = await this.postsRepository.getById(postUnlikeRequest.postId, undefined)

    if (!post) {
      return failure(new PostWithIdNotFound(postUnlikeRequest.postId))
    }

    if (post.userId === user.id) {
      return failure(new UserLikesOwnPosts(user.id))
    }

    return this.unitOfWork.execute(async (transaction) => {
      try {
        post.decreaseLikes()

        await this.postsRepository.save(post, transaction)

        return success(await this.postLikesRepository.delete(post.id, user.id, transaction))
      } catch (err) {
        if (err instanceof CoreError) {
          return failure(err)
        }
        throw err
      }
    })
  }
}
