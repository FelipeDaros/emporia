import { Projeto } from "@prisma/client";
import { IsInt, IsString } from "class-validator";

export class CreateProjetoDto implements Omit<Projeto, 'created_at' | 'id'> {
  @IsString()
  nome: string;

  @IsInt()
  id_job: number;

  @IsString()
  id_usuario: string;
}
