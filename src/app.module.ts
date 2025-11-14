import { Module } from '@nestjs/common'
import { ApplicationDIBuilder } from './application/dependencyInjection/applicationDIBuilder'
import { PresentationDIBuilder } from './presentation/dependencyInjection/presentationDIBuilder'
import { MongoDIBuilder } from './infrastructure/dependencyInjection/mongoDIBuilder'
import { PgDIBuilder } from './infrastructure/dependencyInjection/pgDIBuilder'

const infrastructureSetter = new PgDIBuilder()
const applicationSetter = new ApplicationDIBuilder()
const presentationSetter = new PresentationDIBuilder()

@Module({
  imports: [
    ...presentationSetter.buildImports(),
    ...applicationSetter.buildImports(),
    ...infrastructureSetter.buildImports(),
  ],
  controllers: presentationSetter.buildControllers(),
  providers: [
    ...presentationSetter.buildProviders(),
    ...applicationSetter.buildProviders(),
    ...infrastructureSetter.buildProviders(),
  ],
})
export class AppModule {}
