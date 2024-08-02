import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GruposModule } from './grupos/grupos.module';
import { ItemsModule } from './items/items.module';
import { ClientesModule } from './clientes/clientes.module';
import { CentroDeCustoModule } from './centro-de-custo/centro-de-custo.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CondicaoDePagamentoModule } from './condicao-de-pagamento/condicao-de-pagamento.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsuariosModule, GruposModule, ItemsModule, ClientesModule, CentroDeCustoModule, JobsModule, AuthModule, CondicaoDePagamentoModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
