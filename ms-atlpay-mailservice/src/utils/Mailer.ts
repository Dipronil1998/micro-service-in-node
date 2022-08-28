import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {mailAuthPass,
  mailAuthUser,
  mailHost,
  mailPort} from '../../config/bootstrap';
/**
 * Mailer Class for sending Mail.
 * @class
 */
export class Mailer {
  /**
     * SMTP transporter for sending Mail.
     * @var{nodemailer.Transporter<SMTPTransport.SentMessageInfo>}
     */
  private _transporter:
    nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false,
      auth: {
        user: mailAuthUser,
        pass: mailAuthPass,
      },
    });
  }
  /**
    * Getter Method
    * @return{nodemailer.Transporter<SMTPTransport.SentMessageInfo>}
    * transporter
    */
  public get transporter():
        nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return this._transporter;
  }
  /**
    * Setter Method
    * @param{nodemailer.Transporter<SMTPTransport.SentMessageInfo>}
    *  transporter
    */
  public set transporter(transporter:
        nodemailer.Transporter<SMTPTransport.SentMessageInfo>) {
    this._transporter = transporter;
  }
  /**
     * Send Mail Method.
     * @param{Mail.Option} options
     * @return{Promise<SMTPTransport.SentMessageInfo>}
     */
  public async sendMail(options :Mail.Options):
        Promise<SMTPTransport.SentMessageInfo> {
    // console.log(options);
    const sentMessageInfo : SMTPTransport.SentMessageInfo =
        await this._transporter.sendMail(options);

    return sentMessageInfo;
  }
}
