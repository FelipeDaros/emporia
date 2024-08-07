import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Funcao } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateFuncaoDto implements Omit<Funcao, 'id' | 'created_at' | 'updated_at'>{
  @IsString()
  nome: string;

  @ApiProperty({ enum: ['ATIVO', 'DESATIVADO']})
  @IsString()
  status: $Enums.Status;
}
