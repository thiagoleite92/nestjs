import { Route } from '@prisma/client';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';
export interface IRoutesRepository {
    saveRoute(Route: CreateRouteDto): Promise<string>;
    checkDuplicateRoute(Route: CreateRouteDto): Promise<Route | null>;
    findRouteById(routeId: string): Promise<Route | null>;
    deleteRoute(routeId: string, flightId?: string): Promise<void>;
    updateRoute(routeId: string, updateRoute: UpdateRouteDto): Promise<string>;
    getAll(): Promise<Route[]>;
    findDetailedRoute(routeId: string): Promise<Route>;
}
