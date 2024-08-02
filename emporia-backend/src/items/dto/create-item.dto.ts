import { ApiProperty } from "@nestjs/swagger";
import { Items } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsString, Min } from "class-validator";

export class CreateItemDto implements Omit<Items, 'created_at' | 'id' | 'status'> {
  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @Min(0, { message: 'O valor minímo é de 0' })
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2'
  })
  valor: Decimal;
}