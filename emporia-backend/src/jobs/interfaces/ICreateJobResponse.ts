import { HttpStatus } from "@nestjs/common";
import { Jobs } from "@prisma/client";

export interface ICreateJobResponse {
  message: string;
  body: Jobs;
  status: HttpStatus;
}