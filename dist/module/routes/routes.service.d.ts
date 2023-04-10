import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from '@prisma/client';
import { UpdateRouteDto } from './dto/update-route.dto';
import { UsersService } from '../users/users.service';
import { RoutesRepositoryImpl } from './repository/routes.repositoryImpl';
import { MomentService } from '../shared/moment.service';
export declare class RoutesService {
    private routesRepository;
    private usersService;
    private moment;
    constructor(routesRepository: RoutesRepositoryImpl, usersService: UsersService, moment: MomentService);
    saveRoute(createRouteDto: CreateRouteDto): Promise<String>;
    checkDuplicateRoute(createRouteDto: CreateRouteDto): Promise<Route | null>;
    deleteRoute(routeId: string): Promise<void>;
    findRouteById(routeId: string): Promise<Route>;
    updateRoute(routeId: string, updateRouteDto: UpdateRouteDto): Promise<string>;
    getAllRoutes(): Promise<Route[]>;
}
