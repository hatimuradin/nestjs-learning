import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Just sending a dummy email',
      context: {
        name: user.name,
      },
    });
  }
}
