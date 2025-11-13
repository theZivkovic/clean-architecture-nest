import { Injectable } from '@nestjs/common'
import { IUsersRepository } from 'src/core/interfaces/repositories/usersRepository'
import { User } from 'src/core/models/user'

@Injectable()
export class InMemoryUsersRepository implements IUsersRepository {
  private usersMap: Map<string, User>

  constructor() {
    this.usersMap = new Map<string, User>()
  }

  async getById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.usersMap.get(id))
  }

  async save(user: User): Promise<User> {
    this.usersMap.set(user.id, user)
    return user
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find((x) => x.email === email)
  }

  async getAll(): Promise<Array<User>> {
    return Array.from(this.usersMap.values())
  }
}
