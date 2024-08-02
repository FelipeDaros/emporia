import { PartialType } from '@nestjs/swagger';
import { CreateCondicaoDePagamentoDto } from './create-condicao-de-pagamento.dto';

export class UpdateCondicaoDePagamentoDto extends PartialType(CreateCondicaoDePagamentoDto) {}
