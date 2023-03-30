import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutesService } from './routes.service';

@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
@Controller('/api/route')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.saveRoute(createRouteDto);
  }

  // verificar se a rota já existe no bd
}
