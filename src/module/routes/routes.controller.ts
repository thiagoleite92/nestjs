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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';
import { AdminGuard } from '../auth/admin-role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from '@prisma/client';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('/api/route')
@Roles(Role.ADMIN)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto, @Req() teste) {
    return this.routesService.saveRoute(createRouteDto);
  }

  @Delete(':routeId')
  async deleteRoute(@Param('routeId') routeId: string) {
    return this.routesService.deleteRoute(routeId);
  }

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
  ): Promise<Route[] | Route | null> {
    return routeId
      ? await this.routesService.findRouteById(routeId)
      : await this.routesService.getAllRoutes();
  }
}
