import { Injectable } from '@nestjs/common'
import mongoose, { ClientSession, Connection } from 'mongoose'
import { InjectConnection } from '@nestjs/mongoose'
import { ITransaction, ITransactionFactory } from 'src/core/transactions/transaction'

export class MongooseTransaction implements ITransaction {
  private connection: mongoose.Connection
  private session: ClientSession

  constructor(connection: mongoose.Connection) {
    this.connection = connection
  }
  async start(): Promise<void> {
    this.session = await this.connection.startSession()
    this.session.startTransaction()
  }
  async commit(): Promise<void> {
    await this.session.commitTransaction()
  }
  async rollback(): Promise<void> {
    await this.session.abortTransaction()
  }
  async cleanup(): Promise<void> {
    await this.session.endSession()
  }

  getSession() {
    return this.session
  }
}

@Injectable()
export class MongooseTransactionFactory implements ITransactionFactory {
  constructor(@InjectConnection() private connection: Connection) {}

  create(): Promise<ITransaction> {
    return Promise.resolve(new MongooseTransaction(this.connection))
  }
}
