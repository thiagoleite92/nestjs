import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { SharedModule } from '../shared/shared.module';
import { RoutesRepositoryImpl } from './repository/implementation/routes.repositoryImpl';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SharedModule, AuthModule, UsersModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepositoryImpl],
})
export class RoutesModule {}
