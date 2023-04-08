import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MomentService } from './moment.service';

import { Prisma } from 'prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    this.$use(this.updateTimeField);
    this.$use(this.softDeleteRoute);
    this.$use(this.softDeleteFlight);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async softDeleteRoute(
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<Prisma.MiddlewareParams>,
  ) {
    const data = {
      isDeleted: true,
      deletedAt: MomentService.getMomentPTBR(),
      updatedAt: null,
    };

    if (params.action === 'delete' && params.model === 'Route') {
      params.action = 'update';
      params.args.data = data;
    }

    return next(params);
  }

  async softDeleteFlight(
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<Prisma.MiddlewareParams>,
  ) {
    const data = {
      isDeleted: true,
      flightStatus: 'CANCELED',
      deletedAt: MomentService.getMomentPTBR(),
      updatedAt: null,
    };

    if (params.action === 'delete' && params.model === 'Flight') {
      params.action = 'update';
      params.args.data = data;
    }

    return next(params);
  }

  async updateTimeField(params: Prisma.MiddlewareParams, next) {
    const { data } = params.args;

    const newData = {
      ...data,
      updatedAt: MomentService.getMomentPTBR(),
    };

    if (params.action === 'update') {
      params.args.data = newData;
    }

    return next(params);
  }
}
