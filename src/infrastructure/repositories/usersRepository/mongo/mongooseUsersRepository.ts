import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { MongooseUser } from './mongooseUser'
import { User } from 'src/core/models/user'
import { ITransaction } from 'src/core/transactions/transaction'
import { MongooseTransaction } from 'src/infrastructure/transactions/mongo/mongooseTransactions'
import { BaseMongoRepository } from '../../baseMongoRepository'
import { OptimisticLockError } from 'src/core/errors/optimisticLockError'

@Injectable()
export class MongooseUsersRepository extends BaseMongoRepository implements IUsersRepository {
  constructor(@InjectModel(MongooseUser.name) private mongooseUser: Model<MongooseUser>) {
    super()
  }

  async save(user: User, transaction: ITransaction | undefined): Promise<User> {
    const existingUser = await this.mongooseUser
      .findById(user.id, {}, { session: this.getSession(transaction) })
      .lean()

    if (!existingUser) {
      await this.mongooseUser.create([MongooseUser.fromUser(user)], {
        session: this.getSession(transaction),
      })
      return user
    }

    const updatedUser = await this.mongooseUser.findOneAndUpdate(
      { _id: user.id, __v: existingUser.__v },
      {
        $set: MongooseUser.fromUser(user),
        $inc: { __v: 1 },
      },
      { new: true, session: this.getSession(transaction) }
    )

    if (!updatedUser) {
      throw new OptimisticLockError()
    }

    return MongooseUser.toUser(updatedUser)!
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
