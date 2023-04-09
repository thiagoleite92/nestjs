import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { FlightStatus, Route } from '@prisma/client';
import { UpdateRouteDto } from './dto/update-route.dto';
import { UsersService } from '../users/users.service';
import { RoutesRepositoryImpl } from './repository/routes.repositoryImpl';
import { MomentService } from '../shared/moment.service';
import { DetailedRoute } from './types/detailed-route.type';

@Injectable()
export class RoutesService {
  constructor(
    private routesRepository: RoutesRepositoryImpl,
    private usersService: UsersService,
    private moment: MomentService,
  ) {}

  async saveRoute(createRouteDto: CreateRouteDto): Promise<String> {
    if (!(await this.usersService.findById(createRouteDto.userId))) {
      throw new NotFoundException(
        'Usuário para criação da rota, não encontrado.',
      );
    }

    if (await this.checkDuplicateRoute(createRouteDto)) {
      throw new ConflictException('Rota duplicada, consulte a lista de rotas.');
    }

    const { departureTime, durationEstimated } = createRouteDto;

    const arrivalTime = this.moment.adjustArrivalTime(
      departureTime,
      durationEstimated,
    );

    createRouteDto.arrivalTime = arrivalTime;

    return this.routesRepository.saveRoute(createRouteDto);
  }

  async checkDuplicateRoute(
    createRouteDto: CreateRouteDto,
  ): Promise<Route | null> {
    return await this.routesRepository.checkDuplicateRoute(createRouteDto);
  }

  async deleteRoute(routeId: string): Promise<void> {
    let flightId = null;
    const detailedRoute = (await this.routesRepository.findDetailedRoute(
      routeId,
    )) as DetailedRoute;

    if (!detailedRoute) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (detailedRoute.Flight.length) {
      flightId = detailedRoute.Flight[0].id;
    }

    return this.routesRepository.deleteRoute(routeId, flightId);
  }

  async findRouteById(routeId: string) {
    return this.routesRepository.findRouteById(routeId);
  }

  async updateRoute(
    routeId: string,
    updateRouteDto: UpdateRouteDto,
  ): Promise<string> {
    let newArrivalTime: string = null;
    const route = await this.routesRepository.findRouteById(routeId);

    if (!route) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (!(await this.usersService.findById(updateRouteDto.userId))) {
      throw new NotFoundException(
        'Usuário para atualização da rota, não encontrado.',
      );
    }

    if (
      route.departureTime !== updateRouteDto.departureTime ||
      route.durationEstimated !== updateRouteDto.durationEstimated
    ) {
      newArrivalTime = this.moment.adjustArrivalTime(
        updateRouteDto.departureTime || route.departureTime,
        updateRouteDto.durationEstimated || route.durationEstimated,
      );
      updateRouteDto.arrivalTime = newArrivalTime;
    }

    return this.routesRepository.updateRoute(routeId, updateRouteDto);
  }

  async getAllRoutes(): Promise<Route[]> {
    return this.routesRepository.getAll();
  }
}
