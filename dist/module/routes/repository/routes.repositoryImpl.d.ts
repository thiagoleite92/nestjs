import { Route } from '@prisma/client';
import { PrismaService } from 'src/module/shared/prisma.service';
import { IRoutesRepository } from './routes.repository';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { CreateRouteDto } from '../dto/create-route.dto';
export declare class RoutesRepositoryImpl implements IRoutesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    saveRoute(route: CreateRouteDto): Promise<string>;
    checkDuplicateRoute({ origin, destiny, departureTime, }: CreateRouteDto): Promise<Route | null>;
    findRouteById(routeId: string): Promise<Route>;
    findDetailedRoute(routeId: string): Promise<Route>;
    deleteRoute(routeId: string, flightId?: string): Promise<void>;
    updateRoute(routeId: string, { origin, destiny, departureTime, durationEstimated, userId, arrivalTime, }: UpdateRouteDto): Promise<string>;
    getAll(): Promise<Route[]>;
}
