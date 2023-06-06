import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { UsersService } from '../users/users.service';
import { RoutesRepositoryImpl } from './repository/routes.repositoryImpl';
import { DetailedRoute } from './types/detailed-route.type';
import { Route } from '@prisma/client';
import { MomentService } from '../shared/moment.service';
import { RouteResponse } from './types/route-response.type';

@Injectable()
export class RoutesService {
  constructor(
    private routesRepository: RoutesRepositoryImpl,
    private usersService: UsersService,
    private moment: MomentService,
  ) {}

  async saveRoute(createRouteDto: CreateRouteDto): Promise<string> {
    const route = await this.checkDuplicateRoute(createRouteDto);

    if (!(await this.usersService.findById(createRouteDto.userId))) {
      throw new NotFoundException(
        'Usuário para criação da rota, não encontrado.',
      );
    }

    if (route && !route.isDeleted) {
      throw new ConflictException(
        'Rota duplicada. Ajustes as informações da rota ou consulte a lista de rotas.',
      );
    }

    const durationAdjust = this.moment.adjustDurationTime(
      createRouteDto.durationEstimated,
    );

    createRouteDto.durationEstimated = durationAdjust;

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
    )) as unknown;

    const teste = detailedRoute as DetailedRoute;

    if (!teste) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (teste.Flight.length) {
      flightId = teste.Flight[0].id;
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
    let newarriveDate: string = null;
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
      route.departureDate !== updateRouteDto.departureDate ||
      route.durationEstimated !== updateRouteDto.durationEstimated
    ) {
      newarriveDate = this.moment.adjustArrivalTime(
        updateRouteDto.departureDate || route.departureDate,
        updateRouteDto.durationEstimated || route.durationEstimated,
      );
      updateRouteDto.arriveDate = newarriveDate;
    }

    return this.routesRepository.updateRoute(routeId, updateRouteDto);
  }

  async getAllRoutes(): Promise<RouteResponse[] | any> {
    const routes = await this.routesRepository.getAll();

    return routes.map(
      (route: Route): RouteResponse => ({
        id: route.id,
        Origem: route.origin,
        Destino: route.destiny,
        Disponível: route.isAvailable ? 'Sim' : 'Não',
        Partida: this.moment.dateToString(route.departureDate),
        Chegada: this.moment.dateToString(route.arriveDate),
        Duração:
          route.durationEstimated === '1'
            ? `${route.durationEstimated} hora`
            : `${route.durationEstimated} horas`,
      }),
    );
  }
}
