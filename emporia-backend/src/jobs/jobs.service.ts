import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ICreateJobResponse } from './interfaces/ICreateJobResponse';
import prisma from 'src/prisma.service';
import { IFindAllJobsResponse } from './interfaces/IFindAllJobsResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prismaService: PrismaService){}
  public async create(createJobDto: CreateJobDto): Promise<ICreateJobResponse> {
    try {
      const jobExiste = await prisma.jobs.findFirst({
        where: {
          nome: createJobDto.nome
        }
      })

      if (jobExiste) {
        throw new HttpException('Já existe um job com essse nome cadastrado', HttpStatus.CONFLICT);
      }

      const job = await prisma.jobs.create({
        data: createJobDto
      });

      return {
        message: 'Job cadastrado com sucesso!',
        body: job,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o job', { cause: new Error(error), description: error.message })
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllJobsResponse> {
    try {
      const count = await this.prismaService.jobs.count({
        where: search ? {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : { }
      });

      const jobs = await prisma.jobs.findMany({
        where: search ? {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : { },
        take,
        skip
      });

      return {
        message: 'Jobs listados com sucesso!',
        body: jobs,
        count,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os jobs', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateJobResponse> {
    try {
      const job = await prisma.jobs.findUnique({
        where: {
          id
        }
      });

      if (!job) {
        throw new HttpException('Job não encontrado', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Job encontrado com sucesso!',
        body: job,
        status: HttpStatus.FOUND
      };
    } catch (error) {
      throw new BadRequestException('Erro ao listar o job', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, updateJobDto: UpdateJobDto): Promise<ICreateJobResponse> {
    try {
      const job = await prisma.jobs.findUnique({
        where: {
          id
        }
      });

      if (!job) {
        throw new HttpException('Job não encontrado', HttpStatus.NOT_FOUND);
      }

      const jobUpdate = await prisma.jobs.update({
        where: {
          id
        },
        data: updateJobDto
      });

      return {
        message: 'Job alterado com sucesso!',
        body: jobUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Erro ao alterar o job', { cause: new Error(error), description: error.message });
    }
  }

  public async remove(id: number): Promise<ICreateJobResponse> {
    try {
      const job = await prisma.jobs.findUnique({
        where: {
          id
        }
      });

      if (!job) {
        throw new HttpException('Job não encontrado', HttpStatus.NOT_FOUND);
      }

      const jobExcluido = await prisma.jobs.delete({
        where: {
          id
        }
      });

      return {
        message: 'Job exluído com sucesso!',
        body: jobExcluido,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Erro ao excluír o job', { cause: new Error(error), description: error.message });
    }
  }
}
