// import { LoginRequestDto } from './dto/login-request.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() { login, password }: LoginDto,
  ): Promise<LoginResponseDto> {
    return this.authService.validarUsuario(login, password);
  }
}
