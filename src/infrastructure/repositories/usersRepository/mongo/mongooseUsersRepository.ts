import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { MongooseUser } from './mongooseUser'
import { User } from 'src/core/models/user'
import { ITransaction } from 'src/core/transactions/transaction'
import { MongooseTransaction } from 'src/infrastructure/transactions/mongo/mongooseTransactions'
import { BaseMongoRepository } from '../../baseMongoRepository'

@Injectable()
export class MongooseUsersRepository extends BaseMongoRepository implements IUsersRepository {
  constructor(@InjectModel(MongooseUser.name) private mongooseUser: Model<MongooseUser>) {
    super()
  }

  async save(user: User, transaction: ITransaction | undefined): Promise<User> {
    const document = await this.mongooseUser.findByIdAndUpdate(
      user.id,
      MongooseUser.fromUser(user),
      {
        upsert: true,
        new: true,
        session: this.getSession(transaction),
      }
    )
    return MongooseUser.toUser(document)!
  }
  async getById(id: string, transaction: ITransaction | undefined): Promise<User | undefined> {
    return MongooseUser.toUser(
      await this.mongooseUser.findById(id).session(this.getSession(transaction))
    )
  }
  async getByEmail(
    email: string,
    transaction: ITransaction | undefined
  ): Promise<User | undefined> {
    return MongooseUser.toUser(
      await this.mongooseUser.findOne({ email }).session(this.getSession(transaction))
    )
  }
  async getAll(transaction: ITransaction | undefined): Promise<Array<User>> {
    return (await this.mongooseUser.find().session(this.getSession(transaction))).map(
      (x) => MongooseUser.toUser(x)!
    )
  }
}
