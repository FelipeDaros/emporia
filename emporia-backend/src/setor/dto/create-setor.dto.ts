import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Setor } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateSetorDto implements Omit<Setor, 'id' | 'created_at' | 'updated_at'>{
  @IsString()
  nome: string;

  @ApiProperty({ enum: ['ATIVO', 'DESATIVADO']})
  @IsString()
  status: $Enums.Status;
}
