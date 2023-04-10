import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Prisma } from 'prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
    softDeleteRoute(params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<Prisma.MiddlewareParams>): Promise<Prisma.MiddlewareParams>;
    softDeleteFlight(params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<Prisma.MiddlewareParams>): Promise<Prisma.MiddlewareParams>;
    updateTimeField(params: Prisma.MiddlewareParams, next: any): Promise<any>;
}
