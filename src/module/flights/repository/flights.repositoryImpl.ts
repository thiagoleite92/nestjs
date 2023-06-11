import { Injectable } from '@nestjs/common';
import { IFlightsRepository } from './flights.repository';
import { Flight } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';
import { CreateFlightDto } from '../dto/create-flight.dto';

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
        this.prisma.user.update({
          where: { id: pilotId },
          data: { isAvailable: false },
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
    return this.prisma.flight.findFirst({
      where: { routeId },
    });
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

  async bookedFlightByPilotId(pilotId: string): Promise<Flight[] | []> {
    return this.prisma.flight.findMany({
      where: {
        pilotId,
        flightStatus: 'BOOKED',
      },
    });
  }

  async deleteFlight(flight: Flight): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.route.update({
        where: { id: flight.routeId },
        data: { isAvailable: true },
      }),
      this.prisma.user.update({
        where: { id: flight.pilotId },
        data: { isAvailable: true },
      }),
      this.prisma.flight.delete({
        where: { id: flight.id },
      }),
    ]);
  }

  async getAllFlights(): Promise<Flight[]> {
    return this.prisma.flight.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findFlightsByPilotId(pilotId: string): Promise<Flight[]> {
    return this.prisma.flight.findMany({
      where: { pilotId: pilotId },
      include: { route: true },
    });
  }
}
