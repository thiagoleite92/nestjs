import { PrismaService } from '../shared/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoryImpl } from './repository/users.repositoryImpl';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepositoryImpl],
  exports: [UsersService, UserRepositoryImpl],
})
export class UsersModule {}
