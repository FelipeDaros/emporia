import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_EMAIL,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <felipe-daros@hotmail.com>',
      },
      template: {
        dir: join(__dirname, 'templates'), // Diretório dos templates
        adapter: new HandlebarsAdapter(),  // Adaptador do Handlebars
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService, PrismaService],
})
export class MailModule {}