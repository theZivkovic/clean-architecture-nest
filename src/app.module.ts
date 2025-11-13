import { Module } from '@nestjs/common'
import { ApplicationDIBuilder } from './application/dependencyInjection/applicationDIBuilder'
import { PresentationSetter } from './presentation/dependencyInjection/presentationDIBuilder'
import { InMemoryDIBuilder } from './infrastructure/dependencyInjection/inMemoryDIBuilder'

const infrastructureSetter = new InMemoryDIBuilder()
const applicationSetter = new ApplicationDIBuilder()
const presentationSetter = new PresentationSetter()

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
