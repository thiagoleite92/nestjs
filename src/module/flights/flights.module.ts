import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { FlightsRepositoryImpl } from './repository/flights.repositoryImpl';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [FlightsController],
  providers: [FlightsService, FlightsRepositoryImpl],
})
export class FlightsModule {}
