import { HttpStatus } from "@nestjs/common";
import { Grupos, Items } from "@prisma/client";


export interface IAdicionarItemsAoGrupo {
  message: string;
  body: string;
  status: HttpStatus;
}