import { ApiProperty } from "@nestjs/swagger";
import { Clientes } from "@prisma/client";
import { IsArray, IsInt, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateContatoDto } from "./create-contato-dto";

export class CreateClienteDto implements Omit<Clientes, 'created_at' | 'id' | 'status' | 'updated_at'> {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  documento: string;

  @ApiProperty()
  @IsInt()
  id_centro_de_custo: number;

  @ApiProperty()
  @IsString()
  uf: string;

  @ApiProperty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsString()
  rua: string;

  @ApiProperty()
  @IsString()
  bairro: string;

  @ApiProperty()
  @IsString()
  numero: string;

  @ApiProperty()
  @IsString()
  observacao: string;

  @ApiProperty({
    isArray: true, example: [{
      nome: "string",
      telefone: "string",
      email: "string",
    }]
  })
  contatos: CreateContatoDto[];
}
