import { Flight } from '@prisma/client';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import { CreateFlightDto } from '../dto/create-flight.dto';

export interface IFlightsRepository {
  saveFlight(createFlightDto: CreateFlightDto): Promise<string>;
  findFlightByFlightId(flightId: string): Promise<Flight>;
  findFlightByRouteId(routeId: string): Promise<Flight>;
  updateFlight(
    flightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<Flight>;
}
