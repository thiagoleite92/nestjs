import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy.auth';
import { LocalStrategy } from './local-strategy.auth';

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
  exports: [AuthService],
})
export class AuthModule {}
