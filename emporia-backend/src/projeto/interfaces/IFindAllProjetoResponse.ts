import { HttpStatus } from "@nestjs/common";
import { Projeto } from "@prisma/client";

export interface IFindAllProjetoResponse {
  message: string;
  body: Omit<Projeto, 'created_at'>[];
  count: number;
  status: HttpStatus;
}
