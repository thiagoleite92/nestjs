import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { SharedModule } from './module/shared/shared.module';
import { AuthModule } from './module/auth/auth.module';
import { RoutesModule } from './module/routes/routes.module';
import { HttpModule } from '@nestjs/axios';
import { FlightsModule } from './module/flights/flights.module';

@Module({
  imports: [
    UsersModule,
    SharedModule,
    AuthModule,
    RoutesModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    FlightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
