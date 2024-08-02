import { PartialType } from '@nestjs/swagger';
import { CreateCentroDeCustoDto } from './create-centro-de-custo.dto';

export class UpdateCentroDeCustoDto extends PartialType(CreateCentroDeCustoDto) {}
