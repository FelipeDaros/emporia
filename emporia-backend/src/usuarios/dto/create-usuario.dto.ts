import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Usuarios } from "@prisma/client";
import { IsEmail, IsInt, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto implements Omit<Usuarios, 'created_at' | 'id' | 'updated_at'> {
  @ApiProperty()
  @IsString()
  data_admissao: Date;
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  horas_uteis: number;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  senha: string;
  
  @ApiProperty({ enum: ['ATIVO', 'DESATIVADO']})
  @IsString()
  status: $Enums.Status

  @ApiProperty({ enum: ['CLIENTE', 'EMPRESA']})
  @IsString()
  tipo_usuario: $Enums.TipoUsuario;

  @IsInt()
  id_funcao: number;

  @IsInt()
  id_setor: number;
}
