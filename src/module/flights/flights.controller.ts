import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PilotGuard } from '../auth/pilot-role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtAuthGuard, PilotGuard)
@Controller('/api/flight')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @Roles(Role.PILOT)
  async saveFlight(@Body() createFlightDto: CreateFlightDto): Promise<string> {
    return this.flightsService.saveFlight(createFlightDto);
  }
}
