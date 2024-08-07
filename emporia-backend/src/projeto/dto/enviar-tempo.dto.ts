import { IsInt, IsString } from "class-validator";

export class EnviarTempoDto{
  @IsInt()
  tempo: number

  @IsString()
  id_usuario: string;
}