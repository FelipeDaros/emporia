import { ApiProperty } from "@nestjs/swagger";
import { Squad } from "@prisma/client";
import { IsArray, IsString } from "class-validator";

export class CreateSquadDto implements  Omit<Squad, 'created_at' | 'id' | 'status'>{
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  // @IsArray()
  ids_usuarios: string[];
}