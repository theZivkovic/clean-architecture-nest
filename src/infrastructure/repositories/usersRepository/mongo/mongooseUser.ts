import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'
import { User } from 'src/core/models/user'

@Schema({ collection: 'users' })
export class MongooseUser {
  @Prop({ type: MongooseSchema.Types.String })
  _id: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  static toUser(obj: any): User | undefined {
    return !obj
      ? undefined
      : User.fromFields({
          id: obj._id.toString(),
          email: obj.email,
          firstName: obj.firstName,
          lastName: obj.lastName,
        })
  }

  static fromUser(user: User): MongooseUser {
    const result = new MongooseUser()
    result.email = user.email
    result.firstName = user.firstName
    result.lastName = user.lastName
    result._id = user.id
    return result
  }
}

export const MongooseUserSchema = SchemaFactory.createForClass(MongooseUser)
