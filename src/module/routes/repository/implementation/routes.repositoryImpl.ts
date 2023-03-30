import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Route } from '@prisma/client';
import { PrismaService } from 'src/module/shared/prisma.service';
import { CreateRouteDto } from '../../dto/create-route.dto';
import { IRoutesRepository } from '../routes.repository';

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
}
