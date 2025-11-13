import { IIDGenerator } from 'src/core/interfaces/idGenerator'
import { UUIDIDGenerator } from '../uuidIdGenerator'
import { DynamicModule, Provider } from '@nestjs/common'

export class BaseInfrastructureDIBuilder {
  buildImports(): Array<DynamicModule> {
    return []
  }
  buildProviders(): Array<Provider> {
    return [
      UUIDIDGenerator,
      {
        provide: IIDGenerator,
        useClass: UUIDIDGenerator,
      },
    ]
  }
}
