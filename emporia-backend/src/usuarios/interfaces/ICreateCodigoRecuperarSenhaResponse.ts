import { HttpStatus } from "@nestjs/common";

export interface ICreateCodigoRecuperarSenhaResponse{
  message: string;
  body: number;
  status: HttpStatus;
}