// import { LoginRequestDto } from './dto/login-request.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() { login, password }: any): Promise<any> {
    return this.authService.validarUsuario(login, password);
  }
}
