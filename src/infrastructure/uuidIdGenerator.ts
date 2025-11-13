import { Injectable } from '@nestjs/common'
import { IIDGenerator } from 'src/core/interfaces/idGenerator'
import crypto from 'crypto'

@Injectable()
export class UUIDIDGenerator implements IIDGenerator {
  generateId(): string {
    return crypto.randomUUID()
  }
}
