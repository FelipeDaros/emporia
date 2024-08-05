import { HttpStatus } from "@nestjs/common";


export interface IAdicionarItemsAoGrupo {
  message: string;
  body: string;
  status: HttpStatus;
}