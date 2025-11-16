export interface ITransaction {
  start(): Promise<void>
  commit(): Promise<void>
  rollback(): Promise<void>
  cleanup(): Promise<void>
}

export interface ITransactionFactory {
  create(): Promise<ITransaction>
}

export const ITransactionFactory = Symbol('ITransactionFactory')
