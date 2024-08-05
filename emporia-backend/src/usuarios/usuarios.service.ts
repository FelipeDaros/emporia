import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import prisma from 'src/prisma.service';
import { FindAllResponse } from './interfaces/IFindAllResponse';
import * as bcrypt from 'bcryptjs';
import { IUsuarioResponse } from './interfaces/ICreateResponse';
import { Usuarios } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomNumber } from 'src/helpers/utils/gerarNumeroAleatorio';
import { ICreateCodigoRecuperarSenhaResponse } from './interfaces/ICreateCodigoRecuperarSenhaResponse';
import { MailService } from 'src/mail/mail.service';
import * as moment from 'moment';

@Injectable()
export class UsuariosService {
  constructor(private readonly prismaService: PrismaService, private readonly mailService: MailService) { }
  public async create(createUsuarioDto: CreateUsuarioDto): Promise<IUsuarioResponse> {
    try {
      const usuarioExiste = await prisma.usuarios.findFirst({
        where: {
          email: createUsuarioDto.email,
          status: 'ATIVO'
        }
      })

      if (usuarioExiste) {
        throw new HttpException('Já existe um usuário com essse email cadastrado', HttpStatus.CONFLICT);
      }

      const saltOrRounds = 10;
      const password = createUsuarioDto.senha;
      const passwordHash = await bcrypt.hash(password, saltOrRounds);

      createUsuarioDto.senha = passwordHash

      const usuario = await prisma.usuarios.create({
        data: createUsuarioDto
      });

      return {
        message: 'Usuário cadastrado com sucesso!',
        body: usuario,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o usuário', { cause: new Error(error), description: error.message })
    }
  }

  public async findAll(): Promise<FindAllResponse> {
    try {
      const usuarios = await prisma.usuarios.findMany({
        where: {
          status: 'ATIVO'
        }
      });

      return {
        message: 'Usuários listados com sucesso!',
        body: usuarios,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os usuários', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: string): Promise<IUsuarioResponse> {
    try {
      const usuario = await prisma.usuarios.findUnique({
        where: {
          id
        }
      });

      if (!usuario) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Usuário encontrado com sucesso!',
        body: usuario,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Erro ao listar o usuário', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<IUsuarioResponse> {
    try {
      const usuario = await prisma.usuarios.findUnique({
        where: {
          id
        }
      });

      if (!usuario) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      const usuarioUpdate = await prisma.usuarios.update({
        where: {
          id
        },
        data: updateUsuarioDto
      });

      return {
        message: 'Usuários alterado com sucesso!',
        body: usuarioUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Erro ao alterar o usuário', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: string): Promise<IUsuarioResponse> {
    try {
      const usuario = await prisma.usuarios.findUnique({
        where: {
          id
        }
      });

      if (!usuario) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      const usuarioExcluido: Usuarios = {
        ...usuario,
        status: 'DESATIVADO'
      }

      await this.prismaService.squadIntegrantes.deleteMany({
        where: {
          id_usuario: usuarioExcluido.id
        }
      });

      const usuarioUpdate = await prisma.usuarios.update({
        where: {
          id
        },
        data: usuarioExcluido
      });

      return {
        message: 'Usuários excluido com sucesso!',
        body: usuarioUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Erro ao alterar o usuário', { cause: new Error(error), description: error.message })
    }
  }

  public async gerarCodigoRecuperacaoSenha(email: string): Promise<ICreateCodigoRecuperarSenhaResponse> {
    try {
      const usuario = await this.prismaService.usuarios.findFirst({
        where: {
          email,
          status: 'ATIVO'
        }
      });

      if (!usuario) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      const codigo = randomNumber();

      const codigosRecuperacaoSenha = await this.prismaService.codigosRecuperacaoSenha.create({
        data: {
          codigo,
          id_usuario: usuario.id
        }
      });

      await this.mailService.emailLinkRecuperacao(usuario.id, codigosRecuperacaoSenha.codigo);

      return {
        message: 'Código gerado com sucesso!',
        body: codigosRecuperacaoSenha.codigo,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Erro ao tentar gerar o código para recuperar a senha do usuário', { cause: new Error(error), description: error.message })
    }
  }

  public async verificarCodigoRecuperacaoSenha(codigo: number) {
    try {
      const codigoExistente = await this.prismaService.codigosRecuperacaoSenha.findFirst({
        where: {
          codigo
        }
      });

      if (!codigoExistente) {
        throw new HttpException('Código não encontrado', HttpStatus.NOT_FOUND);
      }

      const validadeCodigo = moment(codigoExistente.created_at).add(1, 'hour');

      if (moment().isAfter(validadeCodigo)) {
        throw new HttpException('O código está vencido', HttpStatus.BAD_REQUEST);
      }


      const usuario = await this.prismaService.usuarios.findUnique({
        where: {
          id: codigoExistente.id_usuario
        }
      })

      const payload = {
        codigoExistente,
        usuario
      }

      return {
        message: 'Código validado com sucesso!',
        body: payload,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Erro ao tentar validar o código', { cause: new Error(error), description: error.message })
    }
  }
}
