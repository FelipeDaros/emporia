import { HttpStatus } from "@nestjs/common";
import { Squad } from "@prisma/client";

export interface IFindAllSquadResponse {
  message: string;
  body: Squad[];
  count: number;
  status: HttpStatus;
}