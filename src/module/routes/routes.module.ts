import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { RoutesRepositoryImpl } from './repository/routes.repositoryImpl';

@Module({
  imports: [SharedModule, AuthModule, UsersModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepositoryImpl],
  exports: [RoutesService],
})
export class RoutesModule {}
