import { HttpStatus } from "@nestjs/common";
import { Clientes } from "@prisma/client";

export interface ICreateClienteResponse {
  message: string;
  body: Clientes;
  status: HttpStatus;
}