import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { ResponseModel } from '../shared/ResponseModel';
import { QuerypParamsDto } from './dto/params.dto';

@UseGuards(JwtAuthGuard, RolesAuthGuard)
@Controller('/api/flight')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @Roles(Role.PILOT)
  async saveFlight(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<ResponseModel> {
    return ResponseModel.response(
      await this.flightsService.saveFlight(createFlightDto),
    );
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
  async deleteFlight(
    @Req() req: Request,
    @Param('flightId') flightId: string,
  ): Promise<void> {
    return this.flightsService.deleteFlight(flightId, req.user.id);
  }

  @Get(':flightId')
  async getFlightById(@Param('flightId') flightId: string): Promise<Flight> {
    return await this.flightsService.findFlightById(flightId);
  }

  @Get()
  async getFlights(
    @Query() params?: QuerypParamsDto,
  ): Promise<Flight[] | Flight | null> {
    return await this.flightsService.getFlights(params);
  }
}
