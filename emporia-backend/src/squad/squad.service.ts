import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateSquadResponse } from './interfaces/ICreateSquadResponse';
import { IFindAllSquadResponse } from './interfaces/IFindAllSquadResponse';
import { $Enums } from '@prisma/client';

@Injectable()
export class SquadService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create({ ids_usuarios, nome }: CreateSquadDto, logoPath: string): Promise<ICreateSquadResponse> {
    try {
      // Verifique se ids_usuarios é uma string JSON e a converta para um array
      if (typeof ids_usuarios === 'string') {
        ids_usuarios = JSON.parse(ids_usuarios);
      }

      const squadExistente = await this.prismaService.squad.findFirst({
        where: {
          nome,
          status: $Enums.Status.ATIVO
        }
      });

      if (squadExistente) {
        throw new HttpException('Já existe um Squad com esse nome cadastrado', HttpStatus.CONFLICT);
      }

      const squad = await this.prismaService.squad.create({
        data: {
          logo: logoPath,
          nome
        }
      });

      const createPromises = ids_usuarios.map((id_usuario: string) =>
        this.prismaService.squadIntegrantes.create({
          data: {
            id_squad: squad.id,
            id_usuario
          }
        })
      );

      await Promise.all(createPromises);

      return {
        message: 'Squad cadastrado com sucesso!',
        body: squad,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o squad', { cause: new Error(error), description: error.message });
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllSquadResponse> {
    try {
      const count = await this.prismaService.squad.count({
        where: search ? {
          status: 'ATIVO',
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' }
      });
      
      const squads = await this.prismaService.squad.findMany({
        where: search ? {
          status: $Enums.Status.ATIVO,
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: $Enums.Status.ATIVO },
        take,
        skip
      });

      return {
        message: 'Squads listados com sucesso!',
        body: squads,
        count,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os squads', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateSquadResponse> {
    try {
      const squad = await this.prismaService.squad.findFirst({
        where: {
          status: $Enums.Status.ATIVO,
          id
        },
        include: {
          squadIntegrantes: true
        }
      });

      return {
        message: 'Squad listado com sucesso!',
        body: squad,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao lista os squad', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, updateSquadDto: UpdateSquadDto, logo: string): Promise<ICreateSquadResponse> {
    try {
      if (typeof updateSquadDto.ids_usuarios === 'string') {
        updateSquadDto.ids_usuarios = JSON.parse(updateSquadDto.ids_usuarios);
      }

      const squad = await this.prismaService.squad.findFirst({
        where: {
          status: $Enums.Status.ATIVO,
          id
        }
      });

      if (!squad) {
        throw new HttpException('Squad não encontrado', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.squadIntegrantes.deleteMany({
        where: {
          id_usuario: {
            notIn: updateSquadDto.ids_usuarios
          },
          id_squad: squad.id
        }
      });

      const updateSquad = await this.prismaService.squad.update({
        where: {
          id
        },
        data: {
          logo: logo ?? squad.logo,
          nome: updateSquadDto.nome
        }
      });

      const createPromises = updateSquadDto.ids_usuarios.map((id_usuario: string) =>
        this.prismaService.squadIntegrantes.create({
          data: {
            id_squad: squad.id,
            id_usuario
          }
        })
      );

      await Promise.all(createPromises);

      return {
        message: 'Squad alterado com sucesso!',
        body: updateSquad,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar o squad', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: number): Promise<ICreateSquadResponse> {
    try {
      const squad = await this.prismaService.squad.findFirst({
        where: {
          status: $Enums.Status.ATIVO,
          id
        }
      });

      if (!squad) {
        throw new HttpException('Squad não encontrado', HttpStatus.NOT_FOUND);
      }


      const updateSquad = await this.prismaService.squad.update({
        where: {
          id
        },
        data: {
          status: $Enums.Status.DESATIVADO
        }
      })

      return {
        message: 'Squad listado com sucesso!',
        body: updateSquad,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao excluir o squad', { cause: new Error(error), description: error.message })

    }
  }
}
