import { HttpStatus } from "@nestjs/common";
import { CreateCondicaoDePagamentoDto } from "../dto/create-condicao-de-pagamento.dto";

export interface IFindAllCondicaoDePagamentoResponse {
  message: string;
  body: CreateCondicaoDePagamentoDto[];
  count: number;
  status: HttpStatus;
}