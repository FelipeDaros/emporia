import { HttpStatus } from "@nestjs/common";
import { Funcao } from "@prisma/client";

export interface ICreateFuncaoResponse {
  message: string;
  body: Funcao;
  status: HttpStatus;
}