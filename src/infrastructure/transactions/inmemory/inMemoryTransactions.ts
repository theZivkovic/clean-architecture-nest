import { Injectable } from '@nestjs/common'
import { ITransaction, ITransactionFactory } from 'src/core/transactions/transaction'

export class InMemoryTransaction implements ITransaction {
  async start(): Promise<void> {}
  async commit(): Promise<void> {}
  async rollback(): Promise<void> {}
  async cleanup(): Promise<void> {}
}

@Injectable()
export class InMemoryTransactionFactory implements ITransactionFactory {
  constructor() {}

  create(): Promise<ITransaction> {
    return Promise.resolve(new InMemoryTransaction())
  }
}
