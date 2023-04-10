import { Flight } from '@prisma/client';
import { CreateFlightDto } from '../dto/create-flight.dto';
export interface IFlightsRepository {
    saveFlight(createFlightDto: CreateFlightDto): Promise<string>;
    findFlightById(flightId: string): Promise<Flight>;
    findFlightByRouteId(routeId: string): Promise<Flight>;
    updateFlight(flightId: string, routeId: string): Promise<Flight>;
    bookedFlightByPilotId(pilotId: string): Promise<Flight>;
    deleteFlight(flightId: string, routeId: string): Promise<void>;
    getAllFlights(): Promise<Flight[]>;
}
