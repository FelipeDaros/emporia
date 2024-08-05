import { HttpStatus } from "@nestjs/common";
import { CentroDeCustos } from "@prisma/client";

export interface IFindAllCentroDeCustosResponse {
  message: string;
  body: CentroDeCustos[];
  count: number;
  status: HttpStatus;
}