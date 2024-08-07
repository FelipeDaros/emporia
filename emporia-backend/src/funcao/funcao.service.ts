import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { IFindAllFuncaoResponse } from './interfaces/IFindAllFuncaoResponse';
import { ICreateFuncaoResponse } from './interfaces/ICreateFuncaoResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class FuncaoService {
  constructor(private readonly prismaService: PrismaService){}
  public async create({ nome, status }: CreateFuncaoDto): Promise<ICreateFuncaoResponse> {
    try {
      const funcaoExistente = await this.prismaService.funcao.findFirst({
        where: {
          nome,
          status: $Enums.Status.ATIVO
        }
      });

      if (funcaoExistente) {
        throw new HttpException('Função já cadastrada com esse nome', HttpStatus.CONFLICT);
      }

      const item = await this.prismaService.funcao.create({
        data: {
          nome,
          status
        }
      });

      return {
        message: 'Função cadastrado com sucesso!',
        body: item,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar a função', { cause: new Error(error), description: error.message });
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllFuncaoResponse> {
    try {
      const count = await this.prismaService.funcao.count({
        where: search ? {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : {}
      });

      const funcao = await this.prismaService.funcao.findMany({
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
        message: 'Funções listados com sucesso!',
        body: funcao,
        count,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar as funções', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateFuncaoResponse> {
    try {
      const funcao = await this.prismaService.funcao.findUnique({
        where: {
          id
        }
      });

      if (!funcao) {
        throw new HttpException('funcao não encontrado', HttpStatus.NOT_FOUND);
      }


      return {
        message: 'Função listado com sucesso!',
        body: funcao,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao encontrar o função', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, updateFuncaoDto: UpdateFuncaoDto): Promise<ICreateFuncaoResponse> {
    try {
      const funcao = await this.prismaService.funcao.findUnique({
        where: {
          id
        }
      });

      if (!funcao) {
        throw new HttpException('Função não encontrado', HttpStatus.NOT_FOUND);
      }

      const funcaoAlterado = await this.prismaService.funcao.update({
        data: updateFuncaoDto,
        where: {
          id
        }
      });

      return {
        message: 'Função alterada com sucesso!',
        body: funcaoAlterado,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao tentar alterar a função', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: number): Promise<ICreateFuncaoResponse> {
    try {
      const funcao = await this.prismaService.funcao.findUnique({
        where: {
          id
        }
      });

      if (!funcao) {
        throw new HttpException('Função não encontrado', HttpStatus.NOT_FOUND);
      }

      const funcaoAlterado = await this.prismaService.funcao.update({
        data: {
          status: $Enums.Status.DESATIVADO
        },
        where: {
          id
        }
      });

      return {
        message: 'Função excluida com sucesso!',
        body: funcaoAlterado,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao tentar excluir a função', { cause: new Error(error), description: error.message })

    }
  }
}
