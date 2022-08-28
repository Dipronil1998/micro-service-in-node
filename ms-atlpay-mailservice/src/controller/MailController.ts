import {NextFunction, Request} from 'express';
import {Response} from 'express-serve-static-core';
import Mail from 'nodemailer/lib/mailer';
import {getConnection} from 'typeorm';
import {mailSentSuccessfullyMessage, ormDBName} from '../../config/bootstrap';
import * as MailEntity from '../model/entity/Mail';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Mails} from '../model/repository/Mails';

import {ResponseService} from '../service/ResponseService';
import {Mailer} from '../utils/Mailer';
import {AppController} from './AppController';
/**
 * Mail Controller
 */
export class MailController extends AppController {
  private _dbName: any;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    super('Mail Controller');
    this._dbName = ormDBName;
  }
  /**
     * Send mail Controller
     * @param{Request} request Request
     * @param{Response} response Response
     * @param{NextFunction} next Next Function
     */
  public send = async (request : Request,
      response : Response,
      next : NextFunction)=>{
    this._request = request;
    this._response = response;
    const from : string = request.body.from;
    const to: string = request.body.to;
    const subject : string = request.body.subject;
    const text : string = request.body.text;
    const cc : string = request.body.cc;
    const bcc : string = request.body.bcc;

    try {
      const mailer: Mailer = new Mailer();
      const mailOptions : Mail.Options = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        cc: cc,
        bcc: bcc,
      };

      await mailer.sendMail(mailOptions);
      new ResponseService()
          .sendSuccessResponse(response, mailSentSuccessfullyMessage);
      const mailRepositoryoptions: RepositoryParameter =
        new RepositoryParameter('mail repository',
            MailEntity.Mail,
            this._dbName,
            'none',
            getConnection(this._dbName));
      const mailRepository : Mails = new Mails(mailRepositoryoptions);
      const mail: MailEntity.Mail = mailRepository.newEntity();
      mail.from = from;
      mail.to = to;
      mail.subject = subject;
      mail.text = text;
      await mailRepository.save(mail);
    } catch (error) {
      next(error);
    }
  };
}
