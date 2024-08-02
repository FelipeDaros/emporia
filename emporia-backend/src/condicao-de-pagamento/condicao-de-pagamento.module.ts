import { Module } from '@nestjs/common';
import { CondicaoDePagamentoService } from './condicao-de-pagamento.service';
import { CondicaoDePagamentoController } from './condicao-de-pagamento.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CondicaoDePagamentoController],
  providers: [CondicaoDePagamentoService, PrismaService],
})
export class CondicaoDePagamentoModule {}
