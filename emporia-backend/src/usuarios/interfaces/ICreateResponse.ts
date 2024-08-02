import { HttpStatus } from "@nestjs/common";
import { Usuarios } from "@prisma/client";

export interface IUsuarioResponse {
  message: string;
  body: Usuarios;
  status: HttpStatus;
}