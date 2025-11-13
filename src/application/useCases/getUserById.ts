import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { User } from 'src/core/models/user'
import { IUseCase } from './useCase'
import { UserWithIdNotFound } from 'src/core/errors/userWithIdNotFound'
import { failure, Result, success } from '../utils/result'

@Injectable()
export class GetUserByIdUseCase implements IUseCase<string, User> {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<Result<User>> {
    const user = await this.usersRepository.getById(userId)

    if (!user) {
      return failure(new UserWithIdNotFound(userId))
    }

    return success(user)
  }
}
