import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/route')
@Roles(Role.ADMIN)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.saveRoute(createRouteDto);
  }

  // verificar se a rota já existe no bd
}
