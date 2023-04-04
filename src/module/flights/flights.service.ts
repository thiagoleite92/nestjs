import { Injectable } from '@nestjs/common';
import { FlightsRepositoryImpl } from './repository/flights.repositoryImpl';
import { CreateFlightDto } from './dto/create-flight.dto';

@Injectable()
export class FlightsService {
  constructor(private flightsRepository: FlightsRepositoryImpl) {}

  async saveFlight(createFlightDto: CreateFlightDto): Promise<string> {
    return this.flightsRepository.saveFlight(createFlightDto);
  }
}
