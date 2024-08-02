import { Module } from '@nestjs/common';
import { CentroDeCustoService } from './centro-de-custo.service';
import { CentroDeCustoController } from './centro-de-custo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CentroDeCustoController],
  providers: [CentroDeCustoService, PrismaService],
})
export class CentroDeCustoModule {}
