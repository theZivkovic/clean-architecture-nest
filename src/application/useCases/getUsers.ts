import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { User } from 'src/core/models/user'
import { IUseCase } from './useCase'
import { success } from '../utils/result'

@Injectable()
export class GetUsersUseCase implements IUseCase<void, Array<User>> {
  constructor(@Inject(IUsersRepository) private readonly usersRepository: IUsersRepository) {}

  async execute() {
    return success(await this.usersRepository.getAll(undefined))
  }
}
