import { Inject, Injectable } from '@nestjs/common'
import { ITransaction, ITransactionFactory } from '../../core/transactions/transaction'
import { Result } from './result'

@Injectable()
export class UnitOfWork {
  constructor(
    @Inject(ITransactionFactory) private readonly transactionFactory: ITransactionFactory
  ) {}

  async execute<TOutput>(
    workFunc: (transaction: ITransaction) => Promise<Result<TOutput>>
  ): Promise<Result<TOutput>> {
    let transaction: ITransaction | undefined

    try {
      transaction = await this.transactionFactory.create()
      await transaction.start()
      const result = await workFunc(transaction)
      result.isSuccess ? await transaction.commit() : await transaction.rollback()
      return result
    } catch (err) {
      await transaction?.rollback()
      throw err
    } finally {
      await transaction?.cleanup()
    }
  }
}
