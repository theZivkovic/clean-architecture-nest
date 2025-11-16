import { Injectable } from '@nestjs/common'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { User } from 'src/core/models/user'
import { PgUser } from './pgUser'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ITransaction } from 'src/core/transactions/transaction'
import { PgTransaction } from 'src/infrastructure/transactions/pg/pgTransactions'
import { BasePgRepository } from '../../basePgRepository'

@Injectable()
export class PgUsersRepository extends BasePgRepository<PgUser> implements IUsersRepository {
  constructor(@InjectRepository(PgUser) private readonly pgUsersRepository: Repository<PgUser>) {
    super(pgUsersRepository, PgUser)
  }

  async getById(id: string, transaction: ITransaction | undefined): Promise<User | undefined> {
    return (await this.getRepository(transaction).findOneBy({ id }))?.toUser()
  }

  async save(user: User, transaction: ITransaction | undefined): Promise<User> {
    await this.getRepository(transaction).save(PgUser.fromUser(user))
    return user
  }

  async getByEmail(
    email: string,
    transaction: ITransaction | undefined
  ): Promise<User | undefined> {
    return (await this.getRepository(transaction).findOneBy({ email }))?.toUser()
  }

  async getAll(transaction: ITransaction | undefined): Promise<Array<User>> {
    return (await this.getRepository(transaction).find()).map((x) => x.toUser())
  }
}
