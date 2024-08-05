import { HttpStatus } from "@nestjs/common";
import { Items } from "@prisma/client";

export interface IListItemsResponse {
  message: string;
  body: Items[];
  count: number;
  status: HttpStatus;
}