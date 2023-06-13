import { Injectable } from '@nestjs/common';
import { Route } from '@prisma/client';
import { IRoutesRepository } from './routes.repository';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { CreateRouteDto } from '../dto/create-route.dto';
import { PrismaService } from '../../shared/prisma.service';

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
    departureDate,
  }: CreateRouteDto): Promise<Route | null> {
    return this.prisma.route.findFirst({
      where: {
        origin,
        destiny,
        departureDate,
        isDeleted: false,
      },
    });
  }

  async findRouteById(routeId: string): Promise<Route> {
    return this.prisma.route.findFirst({
      where: {
        id: routeId,
      },
      orderBy: {
        createdAt: 'desc',
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
      departureDate,
      durationEstimated,
      userId,
      arriveDate,
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
          departureDate,
          durationEstimated,
          userId,
          arriveDate,
        },
      });

      return 'Rota atualizada com sucesso.';
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getAll(): Promise<Route[]> {
    const routes = await this.prisma.route.findMany({
      where: { isDeleted: false },
    });

    return routes;
  }
}
