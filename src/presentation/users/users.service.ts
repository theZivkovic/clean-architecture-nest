import { Injectable } from '@nestjs/common'
import { CreateUserRequestDto } from './users.dtos'
import { CreateUserUserCase } from 'src/application/useCases/createUser'
import { GetUsersUseCase } from 'src/application/useCases/getUsers'
import { GetUserByIdUseCase } from 'src/application/useCases/getUserById'
import { format } from '../utils/responseFormatter'

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUserCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    return format(
      await this.createUserUseCase.execute({
        email: createUserRequestDto.email,
        firstName: createUserRequestDto.firstName,
        lastName: createUserRequestDto.lastName,
      })
    )
  }

  async getUsers() {
    return format(await this.getUsersUseCase.execute())
  }

  async getUserById(userId: string) {
    return format(await this.getUserByIdUseCase.execute(userId))
  }
}
