import { HttpStatus } from "@nestjs/common";
import { Grupos } from "@prisma/client";

export interface IGrupoResponse {
  message: string;
  body: Grupos;
  status: HttpStatus;
}