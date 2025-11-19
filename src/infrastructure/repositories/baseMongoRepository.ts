import { ITransaction } from 'src/core/transactions/transaction'
import { MongooseTransaction } from '../transactions/mongo/mongooseTransactions'
import { ClientSession } from 'mongoose'

export class BaseMongoRepository {
  getSession(transaction: ITransaction | undefined): ClientSession | null {
    return (transaction as MongooseTransaction | undefined)?.getSession() ?? null
  }
}
