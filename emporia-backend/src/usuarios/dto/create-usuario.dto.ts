import { ApiProperty } from "@nestjs/swagger";
import { Usuarios } from "@prisma/client";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto implements Omit<Usuarios, 'created_at' | 'id'> {
  @ApiProperty()
  @IsString()
  data_admissao: Date;
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  funcao: string;

  @ApiProperty()
  @IsNumber()
  horas_uteis: number;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  senha: string;

  @ApiProperty()
  @IsString()
  setor: string;
  
  @ApiProperty({ enum: ['ATIVO', 'DESATIVADO']})
  @IsString()
  status: 'ATIVO' | 'DESATIVADO';

  @ApiProperty({ enum: ['CLIENTE', 'EMPRESA']})
  @IsString()
  tipo_usuario: 'CLIENTE' | 'EMPRESA'
}
