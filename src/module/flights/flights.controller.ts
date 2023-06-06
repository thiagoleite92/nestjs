import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Flight } from '@prisma/client';
import { Roles } from '../../decorator/role.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightsService } from './flights.service';
import { Role } from '../../enums/role.enum';

@UseGuards(JwtAuthGuard, RolesAuthGuard)
@Controller('/api/flight')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @Roles(Role.PILOT)
  async saveFlight(@Body() createFlightDto: CreateFlightDto): Promise<string> {
    return this.flightsService.saveFlight(createFlightDto);
  }

  @Patch(':flightId')
  @Roles(Role.PILOT)
  async updateFlight(
    @Req() req: Request,
    @Param('flightId') flightId: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<string> {
    const { routeId } = updateFlightDto;

    const { id: pilotId } = req.user;

    return this.flightsService.updateFlight(flightId, routeId, pilotId);
  }

  @Delete(':flightId')
  @Roles(Role.PILOT)
  async deleteFlight(
    @Req() req: Request,
    @Param('flightId') flightId: string,
  ): Promise<void> {
    const { id: pilotId } = req.user;

    return this.flightsService.deleteFlight(flightId, pilotId);
  }

  @Get(':pilotId/routes')
  async getFlightsByPilotId(
    @Param('pilotId') pilotId: string,
  ): Promise<Flight[]> {
    return await this.flightsService.findFlightsByPilotId(pilotId);
  }

  @Get(':flightId?')
  async getFlights(
    @Param('flightId') flightId?: string,
  ): Promise<Flight[] | Flight | null> {
    return flightId
      ? await this.flightsService.findFlightById(flightId)
      : await this.flightsService.getAllFlights();
  }
}
