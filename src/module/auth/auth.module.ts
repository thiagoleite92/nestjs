import { LocalStrategy } from './local-strategy.auth';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt-strategy.auth';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    JwtModule.register({
      privateKey: process.env.JWT_SCRET,
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
