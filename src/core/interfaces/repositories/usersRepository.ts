import { User } from 'src/core/models/user'

export interface IUsersRepository {
  save: (user: User) => Promise<User>
  getById: (id: string) => Promise<User | undefined>
  getByEmail: (email: string) => Promise<User | undefined>
  getAll: () => Promise<Array<User>>
}

export const IUsersRepository = Symbol('IUsersRepository')
