import { Injectable } from '@nestjs/common'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { User } from 'src/core/models/user'
import { PgUser } from './pgUser'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PgUsersRepository implements IUsersRepository {
  constructor(@InjectRepository(PgUser) private readonly pgUsersRepository: Repository<PgUser>) {}

  async getById(id: string): Promise<User | undefined> {
    return (await this.pgUsersRepository.findOneBy({ id }))?.toUser()
  }

  async save(user: User): Promise<User> {
    await this.pgUsersRepository.save(PgUser.fromUser(user))
    return user
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return (await this.pgUsersRepository.findOneBy({ email }))?.toUser()
  }

  async getAll(): Promise<Array<User>> {
    return (await this.pgUsersRepository.find()).map((x) => x.toUser())
  }
}
