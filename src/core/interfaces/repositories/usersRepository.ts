import { User } from 'src/core/models/user'
import { ITransaction } from 'src/core/transactions/transaction'

export interface IUsersRepository {
  save: (user: User, transaction: ITransaction | undefined) => Promise<User>
  getById: (id: string, transaction: ITransaction | undefined) => Promise<User | undefined>
  getByEmail: (email: string, transaction: ITransaction | undefined) => Promise<User | undefined>
  getAll: (transaction: ITransaction | undefined) => Promise<Array<User>>
}

export const IUsersRepository = Symbol('IUsersRepository')
