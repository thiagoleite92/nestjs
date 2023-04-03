import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Route } from '@prisma/client';
import { PrismaService } from 'src/module/shared/prisma.service';
import { CreateRouteDto } from '../../dto/create-route.dto';
import { IRoutesRepository } from '../routes.repository';
import { UpdateRouteDto } from '../../dto/update-route.dto';

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
      departureDate,
      durationEstimated,
      userId,
    }: UpdateRouteDto,
  ): Promise<string> {
    try {
      await this.prisma.route.update({
        where: {
          id: routeId,
        },
        data: { origin, destiny, departureDate, durationEstimated, userId },
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
