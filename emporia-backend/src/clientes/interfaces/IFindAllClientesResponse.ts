import { HttpStatus } from "@nestjs/common";
import { Clientes } from "@prisma/client";

export interface IFindAllClientesResponse {
  message: string;
  body: Omit<Clientes, 'created_at' | 'id_centro_de_custo'>[];
  count: number;
  status: HttpStatus;
}
