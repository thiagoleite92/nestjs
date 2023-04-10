import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Request } from 'express';
import { Flight } from '@prisma/client';
export declare class FlightsController {
    private flightsService;
    constructor(flightsService: FlightsService);
    saveFlight(createFlightDto: CreateFlightDto): Promise<string>;
    updateFlight(req: Request, flightId: string, updateFlightDto: UpdateFlightDto): Promise<string>;
    deleteFlight(req: Request, flightId: string): Promise<void>;
    getFlights(flightId?: string): Promise<Flight[] | Flight | null>;
}
