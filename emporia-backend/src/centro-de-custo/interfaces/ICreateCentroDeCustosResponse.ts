import { HttpStatus } from "@nestjs/common";
import { UpdateCentroDeCustoDto } from "../dto/update-centro-de-custo.dto";

export interface ICreateCentroDeCustosResponse {
  message: string;
  body: UpdateCentroDeCustoDto;
  status: HttpStatus;
}