import { ITransaction } from 'src/core/transactions/transaction'
import {
  EntityTarget,
  ObjectLiteral,
  OptimisticLockVersionMismatchError,
  Repository,
} from 'typeorm'
import { PgTransaction } from '../transactions/pg/pgTransactions'
import { OptimisticLockError } from 'src/core/errors/optimisticLockError'

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

  executeWithOptimisticLockHandling<T>(func: () => Promise<T>): Promise<T> {
    try {
      return func()
    } catch (error) {
      if (error instanceof OptimisticLockVersionMismatchError) {
        throw new OptimisticLockError()
      } else throw error
    }
  }
}
