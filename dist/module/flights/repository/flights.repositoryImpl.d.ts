import { IFlightsRepository } from './flights.repository';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { PrismaService } from 'src/module/shared/prisma.service';
import { Flight } from '@prisma/client';
import { MomentService } from 'src/module/shared/moment.service';
export declare class FlightsRepositoryImpl implements IFlightsRepository {
    private prisma;
    private moment;
    constructor(prisma: PrismaService, moment: MomentService);
    saveFlight({ pilotId, routeId }: CreateFlightDto): Promise<string>;
    findFlightById(flightId: string): Promise<Flight>;
    findFlightByRouteId(routeId: string): Promise<Flight>;
    updateFlight(flightId: string, routeId: string): Promise<Flight>;
    bookedFlightByPilotId(pilotId: string): Promise<Flight>;
    deleteFlight(flightId: string, routeId: string): Promise<void>;
    getAllFlights(): Promise<Flight[]>;
}
