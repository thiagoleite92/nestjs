import { Injectable } from '@nestjs/common';
import { IFlightsRepository } from './flights.repository';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { PrismaService } from 'src/module/shared/prisma.service';
import { Flight, Route } from '@prisma/client';
import { UpdateFlightDto } from '../dto/update-flight.dto';

@Injectable()
export class FlightsRepositoryImpl implements IFlightsRepository {
  constructor(private prisma: PrismaService) {}

  async saveFlight({ pilotId, routeId }: CreateFlightDto): Promise<string> {
    try {
      await this.prisma.$transaction([
        this.prisma.route.update({
          where: {
            id: routeId,
          },
          data: {
            isAvailable: false,
          },
        }),
        this.prisma.flight.create({
          data: { pilotId, routeId },
        }),
      ]);

      return 'Voo agendado com sucesso!';
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findFlightById(flightId: string): Promise<Flight> {
    return await this.prisma.flight.findUnique({ where: { id: flightId } });
  }

  async findFlightByRouteId(routeId: string): Promise<Flight> {
    return this.prisma.flight.findFirst({ where: { routeId } });
  }

  async updateFlight(flightId: string, routeId: string): Promise<Flight> {
    try {
      const { routeId: oldRouteId } = await this.prisma.flight.findUnique({
        where: { id: flightId },
      });

      await this.prisma.$transaction([
        this.prisma.route.update({
          where: { id: oldRouteId },
          data: { isAvailable: true },
        }),
        this.prisma.flight.update({
          where: { id: flightId },
          data: { routeId },
        }),
        this.prisma.route.update({
          where: { id: routeId },
          data: { isAvailable: false },
        }),
      ]);

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async bookedFlightByPilotId(pilotId: string): Promise<Flight> {
    return this.prisma.flight.findFirst({
      where: {
        pilotId,
        flightStatus: 'BOOKED',
      },
    });
  }
}
