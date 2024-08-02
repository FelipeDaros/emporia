import { HttpStatus } from "@nestjs/common";
import { Jobs } from "@prisma/client";

export interface IFindAllJobsResponse {
  message: string;
  body: Jobs[];
  status: HttpStatus;
}