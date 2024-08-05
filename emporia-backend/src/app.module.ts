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
import { SquadModule } from './squad/squad.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProjetoModule } from './projeto/projeto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Pasta onde os arquivos serão servidos
      serveRoot: '/uploads', // URL base onde os arquivos serão acessíveis
    }),
    UsuariosModule,
    GruposModule,
    ItemsModule,
    ClientesModule,
    CentroDeCustoModule,
    JobsModule,
    AuthModule,
    CondicaoDePagamentoModule,
    MailModule,
    SquadModule,
    ProjetoModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
