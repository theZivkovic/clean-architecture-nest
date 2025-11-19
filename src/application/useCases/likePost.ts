import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
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
export class LikePostUseCase implements IUseCase<ClassFields<PostLike>, PostLike> {
  constructor(
    @Inject(IPostsRepository)
    private readonly postsRepository: IPostsRepository,
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
    @Inject(IPostLikesRepository)
    private readonly postLikesRepository: IPostLikesRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  async execute(
    postLikeRequest: Omit<ClassFields<PostLike>, 'version'>
  ): Promise<Result<PostLike>> {
    const user = await this.usersRepository.getById(postLikeRequest.userId, undefined)

    if (!user) {
      return failure(new UserWithIdNotFound(postLikeRequest.userId))
    }

    const post = await this.postsRepository.getById(postLikeRequest.postId, undefined)

    if (!post) {
      return failure(new PostWithIdNotFound(postLikeRequest.postId))
    }

    if (post.userId === user.id) {
      return failure(new UserLikesOwnPosts(user.id))
    }

    const postLike = await this.postLikesRepository.get(post.id, user.id, undefined)

    if (postLike) {
      return success(postLike)
    }

    return this.unitOfWork.execute(async (transaction) => {
      try {
        const newPostLike = PostLike.create({
          postId: post.id,
          userId: user.id,
          version: 0,
        })

        await this.postLikesRepository.save(newPostLike, transaction)
        post.increaseLikes()
        await this.postsRepository.save(post, transaction)

        return success(newPostLike)
      } catch (err) {
        if (err instanceof CoreError) {
          return failure(err)
        }
        throw err
      }
    })
  }
}
