import { Flight } from '@prisma/client';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import { CreateFlightDto } from '../dto/create-flight.dto';

export interface IFlightsRepository {
  saveFlight(createFlightDto: CreateFlightDto): Promise<string>;
  findFlightById(flightId: string): Promise<any>;
  findFlightByRouteId(routeId: string): Promise<Flight>;
  updateFlight(flightId: string, routeId: string): Promise<Flight>;
  bookedFlightByPilotId(pilotId: string): Promise<Flight[] | []>;
  deleteFlight(flight: Flight): Promise<void>;
  getAllFlights({
    skip,
    take,
  }: {
    skip?: number;
    take: number;
  }): Promise<Flight[]>;
  findFlightsByPilotId(pilotId: string): Promise<Flight[]>;
}
