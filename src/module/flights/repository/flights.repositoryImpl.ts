import { Injectable } from '@nestjs/common';
import { IFlightsRepository } from './flights.repository';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { PrismaService } from 'src/module/shared/prisma.service';
import { Flight } from '@prisma/client';
import { UpdateFlightDto } from '../dto/update-flight.dto';

@Injectable()
export class FlightsRepositoryImpl implements IFlightsRepository {
  constructor(private prisma: PrismaService) {}

  async saveFlight(flight: CreateFlightDto): Promise<string> {
    await this.prisma.flight.create({ data: flight });

    return 'Voo agendado com sucesso!';
  }

  async findFlightByFlightId(flightId: string): Promise<Flight> {
    return this.prisma.flight.findUnique({ where: { id: flightId } });
  }

  async findFlightByRouteId(routeId: string): Promise<Flight> {
    return this.prisma.flight.findFirst({ where: { routeId } });
  }

  async updateFlight(
    flightId: string,
    { routeId, pilotId }: UpdateFlightDto,
  ): Promise<Flight> {
    try {
      return this.prisma.flight.update({
        where: { id: flightId },
        data: {
          routeId,
          pilotId,
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
