import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesRepositoryImpl } from './repository/implementation/routes.repositoryImpl';

@Injectable()
export class RoutesService {
  constructor(private routesRepository: RoutesRepositoryImpl) {}

  async saveRoute(createRouteDto: CreateRouteDto) {
    return this.routesRepository.saveRoute(createRouteDto);
  }
}
