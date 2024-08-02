import { HttpStatus } from "@nestjs/common";
import { Items } from "@prisma/client";

export interface ICreateItemResponse {
  message: string;
  body: Items;
  status: HttpStatus;
}