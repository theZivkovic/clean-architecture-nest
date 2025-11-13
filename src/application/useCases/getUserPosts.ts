import { Inject, Injectable } from '@nestjs/common'
import { IPostsRepository } from 'src/core/interfaces/repositories/postsRepository'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { Post } from 'src/core/models/post'
import { IUseCase } from './useCase'
import { failure, Result, success } from '../utils/result'
import { UserWithIdNotFound } from 'src/core/errors/userWithIdNotFound'

@Injectable()
export class GetUserPostsUseCase implements IUseCase<string, Array<Post>> {
  constructor(
    @Inject(IPostsRepository)
    private readonly postsRepository: IPostsRepository,
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<Result<Array<Post>>> {
    const user = await this.usersRepository.getById(userId)

    if (!user) {
      return failure(new UserWithIdNotFound(userId))
    }

    return success(await this.postsRepository.getByUserId(userId))
  }
}
