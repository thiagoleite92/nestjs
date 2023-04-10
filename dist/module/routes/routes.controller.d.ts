import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from '@prisma/client';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
    create(createRouteDto: CreateRouteDto): Promise<String>;
    deleteRoute(routeId: string): Promise<void>;
    updateRoute(routeId: string, updateRouteDto: UpdateRouteDto): Promise<string>;
    getRoutes(routeId?: string): Promise<Route[] | Route | null>;
}
