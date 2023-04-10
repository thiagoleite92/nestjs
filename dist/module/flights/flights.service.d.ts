import { FlightsRepositoryImpl } from './repository/flights.repositoryImpl';
import { CreateFlightDto } from './dto/create-flight.dto';
import { RoutesService } from '../routes/routes.service';
import { UsersService } from '../users/users.service';
import { Flight } from '@prisma/client';
export declare class FlightsService {
    private flightsRepository;
    private routesService;
    private usersService;
    constructor(flightsRepository: FlightsRepositoryImpl, routesService: RoutesService, usersService: UsersService);
    saveFlight(createFlightDto: CreateFlightDto): Promise<string>;
    updateFlight(flightId: string, routeId: string, pilotId: string): Promise<string>;
    checkPilotLocationAndRouteOrigin(pilotId: string, routeId: string): Promise<boolean>;
    deleteFlight(flightId: string, pilotId: string): Promise<void>;
    getAllFlights(): Promise<Flight[]>;
    findFlightById(flightId: string): Promise<Flight>;
}
