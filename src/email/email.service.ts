import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: Transporter;
  private readonly logger = new Logger(EmailService.name);

  async onModuleInit() {
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    this.logger.log(`Ethereal test account created. Login: ${testAccount.user}`);
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    const { to, subject, text, html } = options;

    const info = await this.transporter.sendMail({
      from: '"Sua Aplicação" <no-reply@suaapp.com>',
      to,
      subject,
      text,
      html,
    });

    this.logger.log(`✅ Email enviado para ${to}`);
    this.logger.log(`📨 Message ID: ${info.messageId}`);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      this.logger.log(`🔗 Visualize o email em: ${previewUrl}`);
    }
  }
}
