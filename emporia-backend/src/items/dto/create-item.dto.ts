import { ApiProperty } from "@nestjs/swagger";
import { Items } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsNumber, IsString, Min } from "class-validator";

export class CreateItemDto implements Omit<Items, 'created_at' | 'id' | 'status'> {
  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @Min(0, { message: 'O valor minímo é de 0' })
  @IsNumber()
  valor: number; // Use string instead of Decimal
}