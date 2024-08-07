import { HttpStatus } from "@nestjs/common";
import { Setor } from "@prisma/client";

export interface ICreateSetorResponse {
  message: string;
  body: Setor;
  status: HttpStatus;
}