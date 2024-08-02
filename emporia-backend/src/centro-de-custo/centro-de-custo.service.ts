import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCentroDeCustoDto } from './dto/create-centro-de-custo.dto';
import { UpdateCentroDeCustoDto } from './dto/update-centro-de-custo.dto';
import { ICreateCentroDeCustosResponse } from './interfaces/ICreateCentroDeCustosResponse';
import prisma from 'src/prisma.service';
import { IFindAllCentroDeCustosResponse } from './interfaces/IFindAllCentroDeCustosResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CentroDeCustoService {
  constructor(private readonly prismaService: PrismaService) { }
  public async create(createCentroDeCustoDto: CreateCentroDeCustoDto): Promise<ICreateCentroDeCustosResponse> {
    try {
      const centroDeCustoExists = await prisma.centroDeCustos.findFirst({
        where: {
          status: 'ATIVO',
          nome: createCentroDeCustoDto.nome
        }
      });

      if (centroDeCustoExists) {
        throw new HttpException('Já existe um centro de custo com esse nome cadastrado', HttpStatus.CONFLICT);
      }

      const centroDeCusto = await prisma.centroDeCustos.create({
        data: createCentroDeCustoDto
      });

      return {
        message: 'Centro de custo cadastrado com sucesso!',
        body: centroDeCusto,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o centro de custo', { cause: new Error(error), description: error.message })
    }
  }

  public async findAll(): Promise<IFindAllCentroDeCustosResponse> {
    try {
      const centroDeCustos = await prisma.centroDeCustos.findMany({
        where: {
          status: 'ATIVO'
        }
      });

      return {
        message: 'Centro de custos listados com sucesso!',
        body: centroDeCustos,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os centro de custo', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateCentroDeCustosResponse> {
    try {
      const centroDeCusto = await prisma.centroDeCustos.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      return {
        message: 'Centro de custos listados com sucesso!',
        body: centroDeCusto,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os centro de custo', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, updateCentroDeCustoDto: UpdateCentroDeCustoDto): Promise<ICreateCentroDeCustosResponse> {
    try {
      const centroDeCusto = await this.prismaService.centroDeCustos.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      if (!centroDeCusto) {
        throw new HttpException('Não foi localizado um centro de custo com esse id cadastrado', HttpStatus.BAD_REQUEST);
      }

      await this.prismaService.centroDeCustos.update({
        where: {
          id
        },
        data: updateCentroDeCustoDto
      })

      return {
        message: 'Centro de custos alterado com sucesso!',
        body: updateCentroDeCustoDto,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar o centro de custo', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: number): Promise<ICreateCentroDeCustosResponse> {
    try {
      const centroDeCusto = await prisma.centroDeCustos.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      const centroDeCustoSendoUtilizado = await this.prismaService.clientes.findMany({
        where: {
          id_centro_de_custo: id
        }
      });

      if (centroDeCustoSendoUtilizado.length >= 1) {
        throw new HttpException('Centro de custo ainda está sendo utilizado!', HttpStatus.BAD_REQUEST);
      }

      const centroDeCustoUpdate = {
        ...centroDeCusto,
        status: 'DESATIVADO'
      }

      await prisma.centroDeCustos.update({
        where: {
          id
        },
        data: centroDeCustoUpdate
      })

      return {
        message: 'Centro de custos excluído com sucesso!',
        body: centroDeCustoUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao excluir o centro de custo', { cause: new Error(error), description: error.message })
    }
  }
}
