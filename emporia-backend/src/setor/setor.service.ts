import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { IFindAllSetorResponse } from './interfaces/IFindAllSetorResponse';
import { ICreateSetorResponse } from './interfaces/ICreateSetorResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class SetorService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create({ nome, status }: CreateSetorDto): Promise<ICreateSetorResponse> {
    try {
      const setorExistente = await this.prismaService.setor.findFirst({
        where: {
          nome,
          status: $Enums.Status.ATIVO
        }
      });

      if (setorExistente) {
        throw new HttpException('Setor já cadastrado com esse nome', HttpStatus.AMBIGUOUS);
      }

      const item = await this.prismaService.setor.create({
        data: {
          nome,
          status
        }
      });

      return {
        message: 'Setor cadastrado com sucesso!',
        body: item,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o setor', { cause: new Error(error), description: error.message });
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllSetorResponse> {
    try {
      const count = await this.prismaService.setor.count({
        where: search ? {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : {}
      });

      const setor = await this.prismaService.setor.findMany({
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
        message: 'Setores listados com sucesso!',
        body: setor,
        count,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os setores', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateSetorResponse> {
    try {
      const setor = await this.prismaService.setor.findUnique({
        where: {
          id
        }
      });

      if (!setor) {
        throw new HttpException('Setor não encontrado', HttpStatus.NOT_FOUND);
      }


      return {
        message: 'Setor listado com sucesso!',
        body: setor,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao encontrar o setor', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, updateSetorDto: UpdateSetorDto): Promise<ICreateSetorResponse> {
    try {
      const setor = await this.prismaService.setor.findUnique({
        where: {
          id
        }
      });

      if (!setor) {
        throw new HttpException('Setor não encontrado', HttpStatus.NOT_FOUND);
      }

      const setorAlterado = await this.prismaService.setor.update({
        data: updateSetorDto,
        where: {
          id
        }
      });

      return {
        message: 'Setor alterado com sucesso!',
        body: setorAlterado,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao tentar alterar o setor', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: number): Promise<ICreateSetorResponse> {
    try {
      const setor = await this.prismaService.setor.findUnique({
        where: {
          id
        }
      });

      if (!setor) {
        throw new HttpException('Setor não encontrado', HttpStatus.NOT_FOUND);
      }


      const setorAlterado = await this.prismaService.setor.update({
        data: {
          status: $Enums.Status.DESATIVADO
        },
        where: {
          id
        }
      });

      return {
        message: 'Setor excluído com sucesso!',
        body: setorAlterado,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao tentar excluir o setor', { cause: new Error(error), description: error.message })

    }
  }
}
