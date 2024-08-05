import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCondicaoDePagamentoDto } from './dto/create-condicao-de-pagamento.dto';
import { UpdateCondicaoDePagamentoDto } from './dto/update-condicao-de-pagamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateCondicaoDePagamentoResponse } from './interfaces/ICreateCondicaoDePagamentoResponse';
import { IFindAllCondicaoDePagamentoResponse } from './interfaces/IFindAllCondicaoDePagamentoResponse';
import { $Enums } from '@prisma/client';

@Injectable()
export class CondicaoDePagamentoService {
  constructor(private readonly prismaService: PrismaService) { }
  public async create(createCondicaoDePagamentoDto: CreateCondicaoDePagamentoDto): Promise<ICreateCondicaoDePagamentoResponse> {
    try {
      const codicaoExistente = await this.prismaService.condicaoDePagamento.findFirst({
        where: {
          descricao: createCondicaoDePagamentoDto.descricao,
          status: 'ATIVO'
        }
      });

      if (codicaoExistente) {
        throw new HttpException('Já existe uma condição de pagamento com essa descrição cadastrada!', HttpStatus.CONFLICT);
      }

      const condicaoDePagamento = await this.prismaService.condicaoDePagamento.create({
        data: createCondicaoDePagamentoDto
      })

      return {
        message: 'Condição de pagamento cadastrado com sucesso!',
        body: condicaoDePagamento,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar a condição de pagamento', { cause: new Error(error), description: error.message })
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllCondicaoDePagamentoResponse> {
    try {
      const count = await this.prismaService.condicaoDePagamento.count({
        where: search ? {
          status: 'ATIVO',
          descricao: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' }
      });

      const condicoesDePagamento = await this.prismaService.condicaoDePagamento.findMany({
        where: search ? {
          status: 'ATIVO',
          descricao: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' },
        take,
        skip
      });

      return {
        message: 'Codições de pgamento listadas com sucesso!',
        body: condicoesDePagamento,
        count,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar as condições de pagamento', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateCondicaoDePagamentoResponse> {
    try {
      const condicaoDePagamento = await this.prismaService.condicaoDePagamento.findFirst({
        where: {
          id,
          status: 'ATIVO'
        }
      });

      if (!condicaoDePagamento) {
        throw new HttpException('Não foi possível localizar a condição de pagamento.', HttpStatus.CONFLICT);
      }

      return {
        message: 'Condição de pagamento cadastrado com sucesso!',
        body: condicaoDePagamento,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao lista as condição de pagamento', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, updateCondicaoDePagamentoDto: UpdateCondicaoDePagamentoDto): Promise<ICreateCondicaoDePagamentoResponse> {
    try {
      const condicaoDePagamento = await this.prismaService.condicaoDePagamento.findFirst({
        where: {
          id,
          status: 'ATIVO'
        }
      });

      if (!condicaoDePagamento) {
        throw new HttpException('Não foi possível localizar a condição de pagamento.', HttpStatus.CONFLICT);
      }

      const condicaoDePagamentoUpdate = await this.prismaService.condicaoDePagamento.update({
        where: {
          id
        },
        data: updateCondicaoDePagamentoDto
      })

      return {
        message: 'Condição de pagamento alterada com sucesso!',
        body: condicaoDePagamentoUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar a condição de pagamento', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: number): Promise<ICreateCondicaoDePagamentoResponse> {
    try {
      const condicaoDePagamento = await this.prismaService.condicaoDePagamento.findFirst({
        where: {
          id,
          status: 'ATIVO'
        }
      });

      if (!condicaoDePagamento) {
        throw new HttpException('Não foi possível localizar a condição de pagamento.', HttpStatus.CONFLICT);
      }

      const condicaoDePagamentoUpdate = {
        ...condicaoDePagamento,
        status: $Enums.Status.DESATIVADO
      }

      await this.prismaService.condicaoDePagamento.update({
        where: {
          id
        },
        data: condicaoDePagamentoUpdate
      })

      return {
        message: 'Condição de pagamento alterada com sucesso!',
        body: condicaoDePagamentoUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar a condição de pagamento', { cause: new Error(error), description: error.message })
    }
  }
}
