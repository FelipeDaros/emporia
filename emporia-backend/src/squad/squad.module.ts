import { Module } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SquadController],
  providers: [SquadService, PrismaService],
})
export class SquadModule {}
