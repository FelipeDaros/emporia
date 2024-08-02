import { ApiProperty } from "@nestjs/swagger";

export class CreateContatoDto{
  nome: string;
  telefone: string;
  email: string;
}