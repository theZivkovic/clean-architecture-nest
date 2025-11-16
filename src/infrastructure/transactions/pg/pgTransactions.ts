import { Injectable } from '@nestjs/common'
import { ITransaction, ITransactionFactory } from 'src/core/transactions/transaction'
import { DataSource } from 'typeorm'
import { QueryRunner } from 'typeorm/browser'

export class PgTransaction implements ITransaction {
  private queryRunner: QueryRunner
  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner
  }
  async start(): Promise<void> {
    await this.queryRunner.startTransaction()
  }
  async commit(): Promise<void> {
    await this.queryRunner.commitTransaction()
  }
  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction()
  }
  async cleanup(): Promise<void> {
    await this.queryRunner.release()
  }

  get manager() {
    return this.queryRunner.manager
  }
}

@Injectable()
export class PgTransactionFactory implements ITransactionFactory {
  constructor(private dataSource: DataSource) {}

  create(): Promise<ITransaction> {
    const queryRunner = this.dataSource.createQueryRunner()
    return Promise.resolve(new PgTransaction(queryRunner))
  }
}
