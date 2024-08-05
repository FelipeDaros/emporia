import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateProjetoResponse } from './interfaces/ICreateProjetoResponse';
import { IFindAllProjetoResponse } from './interfaces/IFindAllProjetoResponse';

@Injectable()
export class ProjetoService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(createProjetoDto: CreateProjetoDto): Promise<ICreateProjetoResponse> {
    try {
      const proejtoExistente = await this.prismaService.projeto.findFirst({
        where: {
          nome: createProjetoDto.nome
        }
      });

      if (proejtoExistente) {
        throw new HttpException('Projeto já cadastrado com esse nome', HttpStatus.AMBIGUOUS);
      }

      const item = await this.prismaService.projeto.create({
        data: createProjetoDto
      });

      return {
        message: 'Projeto cadastrado com sucesso!',
        body: item,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o projeto', { cause: new Error(error), description: error.message });
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllProjetoResponse> {
    try {
      const count = await this.prismaService.projeto.count({
        where: search ? {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : {}
      });

      const projetos = await this.prismaService.projeto.findMany({
        where: search ? {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : {},
        skip,
        take
      })

      return {
        message: 'Projetos listados com sucesso!',
        body: projetos,
        count,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os clientes', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: string): Promise<ICreateProjetoResponse> {
    try {
      const projeto = await this.prismaService.projeto.findUnique({
        where: {
          id
        },
      });

      if (!projeto) {
        throw new HttpException('Projeto não encontrado!', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Projeto listado com sucesso!',
        body: projeto,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar o projeto', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: string, updateProjetoDto: UpdateProjetoDto): Promise<ICreateProjetoResponse> {
    try {
      const projeto = await this.prismaService.projeto.findUnique({
        where: {
          id
        },
      });

      if (!projeto) {
        throw new HttpException('Projeto não encontrado!', HttpStatus.NOT_FOUND);
      }

      const projetoUpdate = await this.prismaService.projeto.update({
        where: {
          id
        },
        data: updateProjetoDto
      })

      return {
        message: 'Projeto alteado com sucesso!',
        body: projetoUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: string): Promise<ICreateProjetoResponse> {
    try {
      const projeto = await this.prismaService.projeto.findUnique({
        where: {
          id
        },
      });

      if (!projeto) {
        throw new HttpException('Projeto não encontrado!', HttpStatus.NOT_FOUND);
      }

      const projetoExcluido = await this.prismaService.projeto.delete({
        where: {
          id
        }
      })

      return {
        message: 'Projeto alteado com sucesso!',
        body: projetoExcluido,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao excluir', { cause: new Error(error), description: error.message })
    }
  }
}
