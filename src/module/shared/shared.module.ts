import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, BcryptService],
  exports: [BcryptService, PrismaService],
})
export class SharedModule {}
