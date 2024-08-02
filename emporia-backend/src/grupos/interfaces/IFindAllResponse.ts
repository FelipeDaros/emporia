import { HttpStatus } from "@nestjs/common";
import { Grupos } from "@prisma/client";

export interface IFindAllGrupoResponse {
  message: string;
  body: Grupos[];
  status: HttpStatus;
}