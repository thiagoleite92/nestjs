import { BcryptService } from './module/shared/bcrypt.service';
import { PrismaService } from './module/shared/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { SharedModule } from './module/shared/shared.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [UsersModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, BcryptService],
})
export class AppModule {}
