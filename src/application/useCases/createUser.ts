import { Inject, Injectable } from '@nestjs/common'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { User } from 'src/core/models/user'
import { ClassFields } from 'src/core/utils/classFields'
import { IIDGenerator } from 'src/core/interfaces/idGenerator'
import { IUseCase } from './useCase'
import { failure, Result, success } from '../utils/result'
import { CoreError } from 'src/core/errors/coreError'

@Injectable()
export class CreateUserUserCase implements IUseCase<Omit<ClassFields<User>, 'id'>, User> {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
    @Inject(IIDGenerator) private readonly idGenerator: IIDGenerator
  ) {}

  async execute(userRequest: Omit<ClassFields<User>, 'id'>): Promise<Result<User>> {
    try {
      const newUser = User.create(
        {
          email: userRequest.email,
          firstName: userRequest.firstName,
          lastName: userRequest.lastName,
        },
        this.idGenerator
      )

      return success(await this.usersRepository.save(newUser))
    } catch (err) {
      if (err instanceof CoreError) {
        return failure(err)
      }
      throw err
    }
  }
}
