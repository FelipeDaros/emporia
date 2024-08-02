import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ICreateClienteResponse } from './interfaces/ICreateClienteResponse';
import { IFindAllClientesResponse } from './interfaces/IFindAllClientesResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private readonly prismaService: PrismaService) { }
  public async create({
    bairro,
    cidade,
    contatos,
    documento,
    id_centro_de_custo,
    nome,
    numero,
    observacao,
    rua,
    uf
  }: CreateClienteDto): Promise<ICreateClienteResponse> {
    try {
      const clienteExiste = await this.prismaService.clientes.findFirst({
        where: {
          status: 'ATIVO',
          nome
        }
      });

      if (clienteExiste) {
        throw new HttpException('Já existe um cliente com esse nome cadastrado', HttpStatus.CONFLICT);
      }

      const centroDeCustoExistente = await this.prismaService.centroDeCustos.findUnique({
        where: {
          id: id_centro_de_custo
        }
      });

      if (!centroDeCustoExistente) {
        throw new HttpException('Não foi localizado um centro de custo com esse id cadastrado', HttpStatus.NOT_FOUND);
      }

      const cliente = await this.prismaService.clientes.create({
        data: {
          bairro,
          cidade,
          documento,
          id_centro_de_custo,
          nome,
          numero,
          observacao,
          rua,
          uf,
          status: 'ATIVO'
        }
      });

      contatos.forEach(async ({ email, nome, telefone }) => {
        await this.prismaService.contatos.create({
          data: {
            email,
            nome,
            telefone,
            id_cliente: cliente.id
          }
        })
      });

      return {
        message: 'Cliente cadastrado com sucesso!',
        body: cliente,
        status: HttpStatus.CREATED
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao salvar o cliente', { cause: new Error(error), description: error.message })
    }
  }

  public async findAll(search: string, take: number, skip: number): Promise<IFindAllClientesResponse> {
    try {
      const count = await this.prismaService.clientes.count({
        where: search ? {
          status: 'ATIVO',
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' }
      });

      const clientes = await this.prismaService.clientes.findMany({
        where: search ? {
          status: 'ATIVO',
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        } : { status: 'ATIVO' },
        take,
        skip,
        select: {
          id: true,
          nome: true,
          bairro: true,
          documento: true,
          uf: true,
          cidade: true,
          rua: true,
          numero: true,
          observacao: true,
          status: true
        }
      });

      return {
        message: 'Clientes listados com sucesso!',
        body: clientes,
        count,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar os clientes', { cause: new Error(error), description: error.message })
    }
  }

  public async findOne(id: number): Promise<ICreateClienteResponse> {
    try {
      const clienteExiste = await this.prismaService.clientes.findFirst({
        where: {
          status: 'ATIVO',
          id
        },
        include: {
          contatos: true
        }
      });

      if (!clienteExiste) {
        throw new HttpException('Cliente não encontrado!', HttpStatus.CONFLICT);
      }

      return {
        message: 'Cliente listado com sucesso!',
        body: clienteExiste,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar o cliente', { cause: new Error(error), description: error.message })
    }
  }

  public async update(id: number, { bairro, cidade, contatos, documento, id_centro_de_custo, nome, numero, observacao, rua, uf }: UpdateClienteDto): Promise<ICreateClienteResponse> {
    try {
      const clienteExiste = await this.prismaService.clientes.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      if (!clienteExiste) {
        throw new HttpException('Cliente não encontrado!', HttpStatus.CONFLICT);
      }

      const clienteUpdate = await this.prismaService.clientes.update({
        where: {
          id
        },
        data: { bairro, cidade, documento, id_centro_de_custo, nome, numero, observacao, rua, uf }
      });

      return {
        message: 'Cliente alterado com sucesso!',
        body: clienteUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao listar o cliente', { cause: new Error(error), description: error.message })
    }
  }

  public async remove(id: number): Promise<ICreateClienteResponse> {
    try {
      const clienteExiste = await this.prismaService.clientes.findFirst({
        where: {
          status: 'ATIVO',
          id
        }
      });

      if (!clienteExiste) {
        throw new HttpException('Cliente não encontrado!', HttpStatus.CONFLICT);
      }

      const clienteUpdate = {
        ...clienteExiste,
        status: 'DESATIVADO'
      }

      await this.prismaService.clientes.update({
        where: {
          id
        },
        data: clienteUpdate
      });

      return {
        message: 'Cliente excluído com sucesso!',
        body: clienteUpdate,
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new BadRequestException('Ocorreu um erro ao excluir o cliente', { cause: new Error(error), description: error.message })
    }
  }
}
