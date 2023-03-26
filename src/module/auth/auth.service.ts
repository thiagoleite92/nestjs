import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BcryptService } from '../shared/bcrypt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
  ) {}
  async validarUsuario(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (await this.bcrypt.comparePassword(password, user.password)) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken({ email, id, role, name }: User) {
    const token = await this.jwtService.sign(
      { email, id, role, name },
      {
        secret: 'topSecret512',
        expiresIn: '600s',
      },
    );

    return {
      accessToken: token,
      user: {
        email,
        id,
        role,
        name,
      },
    };
  }
}
