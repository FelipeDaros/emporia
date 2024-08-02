import { HttpStatus } from "@nestjs/common";
import { Usuarios } from "@prisma/client";

export interface FindAllResponse {
  message: string;
  body: Usuarios[];
  status: HttpStatus;
}