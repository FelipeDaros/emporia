import { ApiProperty } from "@nestjs/swagger";
import { Grupos } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateGrupoDto implements Omit<Grupos, 'created_at' | 'id' | 'status' | 'updated_at'> {
  @ApiProperty()
  @IsString()
  nome: string;
}
