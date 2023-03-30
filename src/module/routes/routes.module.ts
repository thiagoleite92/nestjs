import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { SharedModule } from '../shared/shared.module';
import { RoutesRepositoryImpl } from './repository/implementation/routes.repositoryImpl';

@Module({
  imports: [SharedModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepositoryImpl],
})
export class RoutesModule {}
