import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import prisma from 'src/prisma.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import * as bcrypt from 'bcryptjs';
import { authResponseDto } from '../dto/auth-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) {}

  public async login({ usuario, senha }: AuthUserDto) {
    // Encontre o usuário pelo nome
    const user = await this.prismaService.usuarios.findFirst({
      where: {
        nome: usuario,
      },
    });

    // Verifique se o usuário existe
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    // Compare a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    // Gere o token JWT
    const payload = { sub: user.id, username: user.nome };
    const token = this.jwtService.sign(payload);
    
    return {
      user: new authResponseDto(user),
      access_token: token,
    };
  }
}
