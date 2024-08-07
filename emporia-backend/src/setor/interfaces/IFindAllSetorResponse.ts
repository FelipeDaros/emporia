import { HttpStatus } from "@nestjs/common";
import { Setor } from "@prisma/client";

export interface IFindAllSetorResponse {
  message: string;
  body: Omit<Setor, 'created_at' | 'updated_at'>[];
  count: number;
  status: HttpStatus;
}
