import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateCondicaoDePagamentoDto {
  @ApiProperty()
  @IsString()
  descricao: string

  @ApiProperty()
  @IsInt()
  quantidade_dias: number;
}
