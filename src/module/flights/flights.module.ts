import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { FlightsRepositoryImpl } from './repository/flights.repositoryImpl';
import { SharedModule } from '../shared/shared.module';
import { RoutesModule } from '../routes/routes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SharedModule, RoutesModule, UsersModule],
  controllers: [FlightsController],
  providers: [FlightsService, FlightsRepositoryImpl],
})
export class FlightsModule {}
