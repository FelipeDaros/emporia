import { HttpStatus } from "@nestjs/common";
import { Funcao } from "@prisma/client";

export interface IFindAllFuncaoResponse {
  message: string;
  body: Omit<Funcao, 'created_at' | 'updated_at'>[];
  count: number;
  status: HttpStatus;
}
