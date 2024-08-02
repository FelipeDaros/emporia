import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly prismaService: PrismaService, private readonly mailerService: MailerService){}

  public async emailLinkRecuperacao(id: string){
    try {
      const usuairo = await this.prismaService.usuarios.findFirst({
        where: {
          id,
          status: 'ATIVO'
        }
      })
      await this.mailerService.sendMail({
        to: 'felipedarosluis@gmail.com',
        subject: 'Alteração da conta',
        template: './email-link-recuperacao',
        context: {
          usuario: usuairo
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
