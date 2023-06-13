import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FlightsRepositoryImpl } from './repository/flights.repositoryImpl';
import { CreateFlightDto } from './dto/create-flight.dto';
import { RoutesService } from '../routes/routes.service';
import { UsersService } from '../users/users.service';
import { Flight } from '@prisma/client';
import { MomentService } from '../shared/moment.service';

@Injectable()
export class FlightsService {
  constructor(
    private flightsRepository: FlightsRepositoryImpl,
    private routesService: RoutesService,
    private usersService: UsersService,
    private moment: MomentService,
  ) {}

  async getFlights(params: { skip?: number; take: number }): Promise<Flight[]> {
    return this.flightsRepository.getAllFlights(params);
  }

  async saveFlight(createFlightDto: CreateFlightDto): Promise<string> {
    const { routeId, pilotId } = createFlightDto;

    const { isAvailable: pilotStatus } = await this.usersService.findById(
      pilotId,
    );

    if (!pilotStatus) {
      throw new BadRequestException('Esse piloto já tem uma rota agendada.');
    }

    const route = await this.routesService.findRouteById(routeId);

    if (!route) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (!route.isAvailable) {
      throw new BadRequestException('Rota já está agendada para outro piloto.');
    }

    if (!(await this.checkPilotLocationAndRouteOrigin(pilotId, routeId))) {
      throw new BadRequestException(
        'Piloto e Origem da rota solicitada não coincidem.',
      );
    }

    return this.flightsRepository.saveFlight(createFlightDto);
  }

  async updateFlight(
    flightId: string,
    routeId: string,
    pilotId: string,
  ): Promise<string> {
    const flight = await this.flightsRepository.findFlightById(flightId);

    if (!flight) {
      throw new NotFoundException('Voo não encontrado');
    }

    const currentPilotId = flight.pilotId;

    if (currentPilotId !== pilotId) {
      throw new BadRequestException(
        'Apenas o piloto que agendou a viagem pode atualiza-la.',
      );
    }

    const route = await this.routesService.findRouteById(routeId);

    if (!route) {
      throw new NotFoundException('Rota não encontrada.');
    }

    if (!route.isAvailable) {
      throw new BadRequestException('Rota não está disponível');
    }

    if (await this.flightsRepository.findFlightByRouteId(routeId)) {
      throw new ConflictException('Essa rota já foi agendada');
    }

    if (!(await this.checkPilotLocationAndRouteOrigin(pilotId, routeId))) {
      throw new BadRequestException(
        'Piloto e Origem da rota solicitada não coincidem.',
      );
    }

    await this.flightsRepository.updateFlight(flightId, routeId);

    return 'Voo atualizado com sucesso';
  }

  async deleteFlight(flightId: string, userId: string): Promise<void> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const flight = await this.findFlightById(flightId);

    if (!flight) {
      throw new NotFoundException('Voo não encontrado');
    }
    const currentPilotId = flight.pilotId;

    if (user.role === 'ADMIN' || currentPilotId === flight.pilotId) {
      return this.flightsRepository.deleteFlight(flight);
    }

    throw new BadRequestException(
      'Apenas o piloto que agendou a viagem pode deleta-la',
    );
  }

  async findFlightById(flightId: string): Promise<Flight> {
    const flight = await this.flightsRepository.findFlightById(flightId);

    if (flight?.user?.password) {
      delete flight?.user.password;
    }

    if (flight?.route?.durationEstimated) {
      flight.route.durationEstimated = this.moment.secondsToHoursAndMinutes(
        flight.route.durationEstimated,
      );
    }

    return flight;
  }

  async checkPilotLocationAndRouteOrigin(
    pilotId: string,
    routeId: string,
  ): Promise<boolean> {
    const { actualLocation } = await this.usersService.findById(pilotId);

    const { origin } = await this.routesService.findRouteById(routeId);

    return actualLocation === origin;
  }
}
