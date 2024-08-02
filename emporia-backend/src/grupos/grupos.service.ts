import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { IGrupoResponse } from './interfaces/ICreateResponse';
import prisma from 'src/prisma.service';
import { IFindAllGrupoResponse } from './interfaces/IFindAllResponse';

@Injectable()
export class GruposService {
  public async create(createGrupoDto: CreateGrupoDto): Promise<IGrupoResponse> {
    try {
      const grupoExiste = await prisma.grupos.findFirst({
        where: {
          status: 'ATIVO'
        }
      })

      if (grupoExiste) {
        throw new HttpException('Já existe um grupo com esse nome cadastrado', HttpStatus.CONFLICT);
      }

      const grupo = await prisma.grupos.create({
        data: createGrupoDto
      });
      
      return {
        message: 'Grupo cadastrado com sucesso!',
        body: grupo,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o grupo', { cause: new Error(error), description: error.message })
    }
  }

  public async findAll(): Promise<IFindAllGrupoResponse> {
    try {
      const grupos = await prisma.grupos.findMany({
        where: {
          status: 'ATIVO'
        }
      });

      return {
        message: 'Grupos listado com sucesso!',
        body: grupos,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os grupos', { cause: new Error(error), description: error.message });
    }
  }

  public async findOne(id: number): Promise<IGrupoResponse> {
    try {
      const grupo = await prisma.grupos.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      if(!grupo){
        throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Grupo listado com sucesso!',
        body: grupo,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao lista o grupo', { cause: new Error(error), description: error.message });
    }
  }

  public async update(id: number, updateGrupoDto: UpdateGrupoDto): Promise<IGrupoResponse> {
    try {
      const grupo = await prisma.grupos.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      if(!grupo){
        throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
      }

      const updateGrupo = {
        ...grupo,
        updateGrupoDto
      }

      await prisma.grupos.update({
        where: {
          id
        },
        data: updateGrupo
      })

      return {
        message: 'Grupo alterado com sucesso!',
        body: updateGrupo,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao alterar o grupo', { cause: new Error(error), description: error.message });
    }
  }

  public async remove(id: number): Promise<IGrupoResponse> {
    try {
      const grupo = await prisma.grupos.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      if(!grupo){
        throw new HttpException('Grupo não encontrado!', HttpStatus.NOT_FOUND);
      }

      const updateGrupo = {
        ...grupo,
        status: 'DESATIVADO'
      }

      await prisma.grupos.update({
        where: {
          id
        },
        data: updateGrupo
      })

      return {
        message: 'Grupo desativado com sucesso!',
        body: updateGrupo,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao desativar o grupo', { cause: new Error(error), description: error.message });
    }
  }
}
