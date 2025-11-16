import { ITransaction } from 'src/core/transactions/transaction'
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { PgTransaction } from '../transactions/pg/pgTransactions'
import { InjectRepository } from '@nestjs/typeorm'

export class BasePgRepository<TPGEntity extends ObjectLiteral> {
  pgRepository: Repository<TPGEntity>
  target: EntityTarget<TPGEntity>

  constructor(pgRepository: Repository<TPGEntity>, target: EntityTarget<TPGEntity>) {
    this.pgRepository = pgRepository
    this.target = target
  }

  getRepository(transaction: ITransaction | undefined) {
    return transaction
      ? (transaction as PgTransaction).manager.getRepository<TPGEntity>(this.target)
      : this.pgRepository
  }
}
