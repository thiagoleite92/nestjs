import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Route } from '@prisma/client';
import { PrismaService } from 'src/module/shared/prisma.service';
import { IRoutesRepository } from './routes.repository';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { CreateRouteDto } from '../dto/create-route.dto';

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

  async findRouteById(routeId: string) {
    return this.prisma.route.findFirst({
      where: {
        id: routeId,
      },
    });
  }

  async deleteRoute(routeId: string): Promise<void> {
    await this.prisma.route.delete({
      where: {
        id: routeId,
      },
    });

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
    return this.prisma.route.findMany({});
  }
}
