import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Route } from '@prisma/client';
import { PrismaService } from 'src/module/shared/prisma.service';
import { IRoutesRepository } from './routes.repository';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { CreateRouteDto } from '../dto/create-route.dto';
import { DetailedRoute } from '../types/detailed-route.type';

@Injectable()
export class RoutesRepositoryImpl implements IRoutesRepository {
  constructor(private prisma: PrismaService) {}

  async saveRoute(route: CreateRouteDto): Promise<string> {
    try {
      await this.prisma.route.create({ data: route });
      return 'Rota criada com sucesso';
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async checkDuplicateRoute({
    origin,
    destiny,
    departureTime,
  }: CreateRouteDto): Promise<Route | null> {
    return this.prisma.route.findFirst({
      where: {
        origin,
        destiny,
        departureTime,
      },
    });
  }

  async findRouteById(routeId: string): Promise<Route> {
    return this.prisma.route.findFirst({
      where: {
        id: routeId,
      },
    });
  }

  async findDetailedRoute(routeId: string): Promise<Route> {
    const detailedRoute = await this.prisma.route.findFirst({
      where: {
        id: routeId,
      },
      include: {
        Flight: true,
      },
    });

    return detailedRoute;
  }

  async deleteRoute(routeId: string, flightId?: string): Promise<void> {
    if (flightId) {
      await this.prisma.$transaction([
        this.prisma.route.delete({
          where: {
            id: routeId,
          },
        }),
        this.prisma.flight.delete({
          where: {
            id: flightId,
          },
        }),
      ]);
    } else {
      await this.prisma.route.delete({
        where: { id: routeId },
      });
    }

    return;
  }

  async updateRoute(
    routeId: string,
    {
      origin,
      destiny,
      departureTime,
      durationEstimated,
      userId,
      arrivalTime,
    }: UpdateRouteDto,
  ): Promise<string> {
    try {
      await this.prisma.route.update({
        where: {
          id: routeId,
        },
        data: {
          origin,
          destiny,
          departureTime,
          durationEstimated,
          userId,
          arrivalTime,
        },
      });

      return 'Rota atualizada com sucesso.';
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getAll(): Promise<Route[]> {
    return this.prisma.route.findMany({
      where: { isAvailable: true },
    });
  }
}
