import { HttpStatus } from "@nestjs/common";
import { Projeto } from "@prisma/client";

export interface ICreateProjetoResponse {
  message: string;
  body: Projeto;
  status: HttpStatus;
}