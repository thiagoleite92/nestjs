import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { PrismaService } from './prisma.service';
import { MomentService } from './moment.service';

@Module({
  providers: [PrismaService, BcryptService, MomentService],
  exports: [BcryptService, PrismaService, MomentService],
})
export class SharedModule {}
