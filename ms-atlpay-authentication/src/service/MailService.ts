import Mail from 'nodemailer/lib/mailer';
import {FORGET_PASSWORD_URL} from '../../config/bootstrap';
import {Mailer} from '../utils/Mailer';

/**
 * MailService class
 * @class
 */
export class MailService {
  /**
   * Send Reset Password Email Token method
   * @param{string} email
   * @param{string} token
   */
  public sendResetPasswordEmailToken = async (email: string, token: string) => {
    try {
      await new Mailer().sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: 'ATL_PAY Account Password Reset',
        html: `
              <h4>Reset Your Password</h4>
              <p>Click this to : 
              <a href=${FORGET_PASSWORD_URL}${token}>Reset Password</a>
              </p>`,
      });
      return true;
    } catch (err: any) {
      return false;
    }
  };
  /**
   * Send OTP email for two factor authentication
   * @param{string} email
   * @param{number} otp
   * @return{Promise<boolean>}
   */
  public sendOTP = async (email: string, otp: number) : Promise<boolean>=>{
    const options : Mail.Options = {
      from: 'atlpay@agpaytech.co.uk',
      to: email,
      subject: '2FA',
      text: 'OTP is '+otp,

    };
    try {
      await new Mailer().sendMail(options);
      return true;
    } catch (error: any) {
      return false;
    }
  };
  /**
   * Send Admin email and password information
   * @param{string} email
   * @param{string} password
   */
  public sendAdminLoginInfo = async (email: string,
      password : string): Promise<boolean> =>{
    const options : Mail.Options = {
      from: 'admin@agpaytech.co.uk',
      to: email,
      subject: 'Admin Login info',
      text: `Admin email `+email+` and password `+password+
      `\nNote: Please chnage the password`,

    };
    try {
      await new Mailer().sendMail(options);
      return true;
    } catch (error: any) {
      return false;
    }
  };
}
