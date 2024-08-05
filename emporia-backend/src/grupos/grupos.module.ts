import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GruposController],
  providers: [GruposService, PrismaService],
})
export class GruposModule {}
