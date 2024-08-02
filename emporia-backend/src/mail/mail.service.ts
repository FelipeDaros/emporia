import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly prismaService: PrismaService, private readonly mailerService: MailerService){}

  public async emailLinkRecuperacao(id: string, codigo: number){
    try {
      const usuairo = await this.prismaService.usuarios.findFirst({
        where: {
          id,
          status: 'ATIVO'
        }
      })

      const url = process.env.WEB_URL+'/nova-senha/'+codigo

      await this.mailerService.sendMail({
        to: usuairo.email,
        subject: 'Alteração da conta',
        template: './email-link-recuperacao',
        context: {
          usuario: usuairo,
          url
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
