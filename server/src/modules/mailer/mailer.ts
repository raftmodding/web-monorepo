import fs from 'fs';
import path from 'path';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { AccountCreation, User } from '../../models';
import cfg from '../cfg';

export interface Replaces {
  [key: string]: string;
}

export class Mailer {
  private readonly opts: SMTPTransport.Options;
  private readonly transporter: Transporter;

  constructor(opts: SMTPTransport.Options) {
    this.opts = opts;
    this.transporter = nodemailer.createTransport(opts);
  }

  /**
   * Sent when the user requests a password-reset
   * @param user User
   * @param token string
   */
  async sendPasswordResetMail(user: User, token: string): Promise<void> {
    const { email, username } = user;
    const baseUrl = cfg.frontendBaseUrl;
    const url = `${baseUrl}forgotpassword?token=${token}`;

    const mailData = {
      from: this.opts.from,
      to: email,
      subject: 'Password rest for raftmodding.com',
      text: this.loadTemplate('resetPassword.txt', { username, baseUrl, url }),
    };

    try {
      await this.transporter.sendMail(mailData);
    } catch (e) {
      console.error('failed to send reset-password-mail: ', e);
    }
  }

  async sendAccountCreationMail(
    accountCreation: AccountCreation,
  ): Promise<void> {
    const { token, username, email } = accountCreation;
    const baseUrl = cfg.frontendBaseUrl;
    const url = `${baseUrl}signup?token=${token}`;

    const mailData = {
      from: this.opts.from,
      to: email,
      subject: `Account confirmation for user ${username} on the RaftModding site`,
      text: this.loadTemplate('accountCreation.txt', {
        username,
        baseUrl,
        email,
        url,
      }),
    };

    try {
      await this.transporter.sendMail(mailData);
    } catch (e) {
      console.error('failed to send reset-password-mail: ', e);
    }
  }

  private loadTemplate(filename: string, replaces: Replaces) {
    const file = path.join(__dirname, 'templates', filename);

    if (!fs.existsSync(file)) {
      throw new Error('given template not found!');
    }

    let template = fs.readFileSync(file, { encoding: 'utf-8' });

    if (replaces && Object.keys(replaces)) {
      const keys = Object.keys(replaces);

      keys.forEach((key: string) => {
        template = template.replace(`{{ ${key} }}`, replaces[key]);
      });
    }

    return template;
  }
}

const mailer = new Mailer(cfg.mailConfig);

export default mailer;
