import { Module } from '@nestjs/common';
import { SetorService } from './setor.service';
import { SetorController } from './setor.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SetorController],
  providers: [SetorService, PrismaService],
})
export class SetorModule {}
