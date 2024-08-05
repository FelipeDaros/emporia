import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { IListItemsResponse } from './interfaces/IListItemsResponse';
import { STATUS } from 'src/helpers/enums/status';
import { ICreateItemResponse } from './interfaces/ICreateItemResponse';
import { IAdicionarItemsAoGrupo } from './interfaces/IAdicionarGrupoAoItem';
import { CreateGrupoItemsDto } from './dto/create-grupo-items';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) { }
  public async create(createItemDto: CreateItemDto): Promise<ICreateItemResponse> {
    try {
      const itemExistente = await this.prismaService.items.findFirst({
        where: {
          descricao: createItemDto.descricao
        }
      });

      if (itemExistente) {
        throw new HttpException('Item cadastrado com essa descrição', HttpStatus.AMBIGUOUS);
      }

      const item = await this.prismaService.items.create({
        data: createItemDto
      });

      return {
        message: 'item cadastrado com sucesso!',
        body: item,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar os items', { cause: new Error(error), description: error.message });
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IListItemsResponse> {
    try {
      const count = await this.prismaService.items.count({
        where: search ? {
          status: 'ATIVO',
          descricao: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' }
      });

      const items = await this.prismaService.items.findMany({
        where: search ? {
          status: 'ATIVO',
          descricao: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' },
        take,
        skip
      })

      return {
        message: 'item listados com sucesso!',
        body: items,
        count,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os item', { cause: new Error(error), description: error.message });
    }
  }

  public async findOne(id: number): Promise<ICreateItemResponse> {
    try {
      const item = await this.prismaService.items.findFirst({
        where: {
          status: STATUS.ATIVO,
          id
        }
      });

      if (!item) {
        throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Item listado com sucesso!',
        body: item,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao lista o item', { cause: new Error(error), description: error.message });
    }
  }

  public async update(id: number, updateItenDto: UpdateItemDto): Promise<ICreateItemResponse> {
    try {
      const item = await this.prismaService.items.findFirst({
        where: {
          status: STATUS.ATIVO,
          id
        }
      });

      if (!item) {
        throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
      }

      const updateItem = await this.prismaService.items.update({
        where: {
          id
        },
        data: updateItenDto
      })

      return {
        message: 'Item alterado com sucesso!',
        body: updateItem,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar o item', { cause: new Error(error), description: error.message });
    }
  }

  public async remove(id: number): Promise<ICreateItemResponse> {
    try {
      const item = await this.prismaService.items.findFirst({
        where: {
          status: STATUS.ATIVO,
          id
        }
      });

      if (!item) {
        throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
      }

      const itemUpdate = {
        ...item,
        status: STATUS.DESATIVADO
      }

      await this.prismaService.items.update({
        where: {
          id
        },
        data: itemUpdate
      })

      return {
        message: 'Item excluído com sucesso!',
        body: itemUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao excluir o item', { cause: new Error(error), description: error.message });
    }
  }

  public async adicionarItemsAoGrupo({ id_grupo, ids_item }: CreateGrupoItemsDto): Promise<IAdicionarItemsAoGrupo> {
    try {
      const grupo = await this.prismaService.grupos.findFirst({
        where: {
          id: id_grupo,
          status: STATUS.ATIVO
        }
      });

      if (!grupo) {
        throw new HttpException('Grupo não encontrado', HttpStatus.NOT_FOUND);
      }


      const createPromises = ids_item.map(item =>
        this.prismaService.grupoItems.create({
          data: {
            id_grupo,
            id_item: item
          }
        })
      );

      await Promise.all(createPromises);

      return {
        message: 'Items adicionado com sucesso ao grupo!',
        body: 'none',
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao tentar salvar os items ao grupo', { cause: new Error(error), description: error.message });
    }
  }
}
