import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';
import { AdminGuard } from '../auth/admin-role.guard';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from '@prisma/client';
import { Roles } from '../../decorator/role.decorator';
import { Role } from '../../enums/role.enum';
import { RouteResponse } from './types/route-response.type';

@UseGuards(JwtAuthGuard)
@Controller('/api/route')
@Roles(Role.ADMIN)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.saveRoute(createRouteDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':routeId')
  async deleteRoute(@Param('routeId') routeId: string) {
    return this.routesService.deleteRoute(routeId);
  }

  @UseGuards(AdminGuard)
  @Patch(':routeId')
  async updateRoute(
    @Param('routeId') routeId: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ): Promise<string> {
    return this.routesService.updateRoute(routeId, updateRouteDto);
  }

  @Get(':routeId?')
  async getRoutes(
    @Param('routeId') routeId?: string,
  ): Promise<RouteResponse[] | Route | null> {
    return routeId
      ? await this.routesService.findRouteById(routeId)
      : await this.routesService.getAllRoutes();
  }
}
