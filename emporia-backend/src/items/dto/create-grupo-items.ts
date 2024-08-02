import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class CreateGrupoItemsDto{
  @ApiProperty()
  @IsNumber()
  id_grupo: number;

  @ApiProperty()
  @IsArray()
  ids_item: number[];
}