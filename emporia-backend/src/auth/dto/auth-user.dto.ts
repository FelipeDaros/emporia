import { IsString } from "class-validator";

export class AuthUserDto {
  @IsString()
  usuario: string;
  @IsString()
  senha: string
}