import { ApiProperty } from "@nestjs/swagger";
import { Jobs } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateJobDto implements Omit<Jobs, 'created_at' | 'id'> {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  descricao: string;
}