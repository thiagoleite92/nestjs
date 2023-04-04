import { Injectable } from '@nestjs/common';
import { IFlightsRepository } from './flights.repository';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { PrismaService } from 'src/module/shared/prisma.service';
import { Flight } from '@prisma/client';

@Injectable()
export class FlightsRepositoryImpl implements IFlightsRepository {
  constructor(private prisma: PrismaService) {}

  async saveFlight(flight: CreateFlightDto): Promise<string> {
    await this.prisma.flight.create({ data: flight });

    return 'Voo agendado com sucesso!';
  }
}
