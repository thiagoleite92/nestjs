import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from '@prisma/client';
import { UpdateRouteDto } from './dto/update-route.dto';
import { UsersService } from '../users/users.service';
import { RoutesRepositoryImpl } from './repository/routes.repositoryImpl';

@Injectable()
export class RoutesService {
  constructor(
    private routesRepository: RoutesRepositoryImpl,
    private usersService: UsersService,
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

    return this.routesRepository.saveRoute(createRouteDto);
  }

  async checkDuplicateRoute(
    createRouteDto: CreateRouteDto,
  ): Promise<Route | null> {
    return await this.routesRepository.checkDuplicateRoute(createRouteDto);
  }

  async findRouteById(routeId: string): Promise<Route | null> {
    return this.routesRepository.findRouteById(routeId);
  }

  async deleteRoute(routeId: string): Promise<void> {
    if (!(await this.findRouteById(routeId))) {
      throw new NotFoundException('Rota não encontrada.');
    }

    return this.routesRepository.deleteRoute(routeId);
  }

  async updateRoute(
    routeId: string,
    updateRouteDto: UpdateRouteDto,
  ): Promise<string> {
    if (!(await this.findRouteById(routeId))) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (!(await this.usersService.findById(updateRouteDto.userId))) {
      throw new NotFoundException(
        'Usuário para atualização da rota, não encontrado.',
      );
    }
    return this.routesRepository.updateRoute(routeId, updateRouteDto);
  }

  async getAllRoutes(): Promise<Route[]> {
    return this.routesRepository.getAll();
  }
}
