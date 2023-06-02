import { Flight } from '@prisma/client';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import { CreateFlightDto } from '../dto/create-flight.dto';

export interface IFlightsRepository {
  saveFlight(createFlightDto: CreateFlightDto): Promise<string>;
  findFlightById(flightId: string): Promise<Flight>;
  findFlightByRouteId(routeId: string): Promise<Flight>;
  updateFlight(flightId: string, routeId: string): Promise<Flight>;
  bookedFlightByPilotId(pilotId: string): Promise<Flight>;
  deleteFlight(flightId: string, routeId: string): Promise<void>;
  getAllFlights(): Promise<Flight[]>;
  findFlightsByPilotId(pilotId: string): Promise<Flight[]>;
}
