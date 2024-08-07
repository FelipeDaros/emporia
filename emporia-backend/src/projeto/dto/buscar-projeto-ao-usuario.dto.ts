import { IsString } from "class-validator";

export class BuscarProjetoAoUsuarioDto {
  @IsString()
  codigo: string;

  @IsString()
  email: string;
}
