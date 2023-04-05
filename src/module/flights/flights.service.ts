import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { FlightsRepositoryImpl } from './repository/flights.repositoryImpl';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { RoutesService } from '../routes/routes.service';
import { Route } from '@prisma/client';

@Injectable()
export class FlightsService {
  constructor(
    private flightsRepository: FlightsRepositoryImpl,
    private routesService: RoutesService,
  ) {}

  async saveFlight(createFlightDto: CreateFlightDto): Promise<string> {
    if (!(await this.checkRouteExistance(createFlightDto.routeId))) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (await this.checkDuplicateFlightByRoute(createFlightDto.routeId)) {
      throw new ConflictException('Rota já está agendada para outro piloto.');
    }

    return this.flightsRepository.saveFlight(createFlightDto);
  }

  async updateFlight(
    flightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<string> {
    if (!(await this.checkRouteExistance(updateFlightDto.routeId))) {
      throw new NotFoundException('Rota não encontrada.');
    }

    const findByFlightId = await this.flightsRepository.findFlightByFlightId(
      flightId,
    );

    if (!findByFlightId) {
      throw new NotFoundException('Voo não encontrado');
    }

    if (await this.checkDuplicateFlightByRoute(updateFlightDto.routeId)) {
      throw new ConflictException('Rota já está agendada para outro piloto.');
    }

    await this.flightsRepository.updateFlight(flightId, updateFlightDto);

    return 'Voo atualizado com sucesso';
  }

  async checkDuplicateFlightByRoute(routeId: string): Promise<boolean> {
    const findByRouteId = await this.flightsRepository.findFlightByRouteId(
      routeId,
    );

    return !!findByRouteId;
  }

  async checkRouteExistance(routeId: string): Promise<Route> {
    const findRouteById = await this.routesService.findRouteById(routeId);

    return findRouteById;
  }
}
