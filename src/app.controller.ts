import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }
}
