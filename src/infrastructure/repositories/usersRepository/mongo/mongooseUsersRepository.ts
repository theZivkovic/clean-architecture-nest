import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { MongooseUser } from './mongooseUser'
import { User } from 'src/core/models/user'

@Injectable()
export class MongooseUsersRepository implements IUsersRepository {
  constructor(@InjectModel(MongooseUser.name) private mongooseUser: Model<MongooseUser>) {}

  async save(user: User): Promise<User> {
    const document = await this.mongooseUser.findByIdAndUpdate(
      user.id,
      MongooseUser.fromUser(user),
      {
        upsert: true,
        new: true,
      }
    )
    return MongooseUser.toUser(document)!
  }
  async getById(id: string): Promise<User | undefined> {
    return MongooseUser.toUser(await this.mongooseUser.findById(id))
  }
  async getByEmail(email: string): Promise<User | undefined> {
    return MongooseUser.toUser(await this.mongooseUser.findOne({ email }))
  }
  async getAll(): Promise<Array<User>> {
    return (await this.mongooseUser.find()).map((x) => MongooseUser.toUser(x)!)
  }
}
