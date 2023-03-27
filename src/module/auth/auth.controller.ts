import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/api/auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: any): Promise<any> {
    return this.authService.generateToken(req.user)
  }
}
