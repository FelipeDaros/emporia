import { HttpStatus } from "@nestjs/common";
import { CreateCondicaoDePagamentoDto } from "../dto/create-condicao-de-pagamento.dto";

export interface ICreateCondicaoDePagamentoResponse {
  message: string;
  body: CreateCondicaoDePagamentoDto;
  status: HttpStatus;
}