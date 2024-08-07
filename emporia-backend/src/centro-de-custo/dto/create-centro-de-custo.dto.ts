import { ApiProperty } from "@nestjs/swagger";
import { CentroDeCustos } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateCentroDeCustoDto implements Omit<CentroDeCustos, 'created_at' | 'id' | 'status' | 'updated_at'> {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  descricao: string;
}