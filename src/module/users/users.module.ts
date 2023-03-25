import { PrismaService } from './../../database/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoryImpl } from './users.repositoryImpl';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryImpl, PrismaService],
})
export class UsersModule {}
