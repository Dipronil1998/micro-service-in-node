import {NextFunction, Request, Response} from 'express';
import moment from 'moment';
import {getConnection} from 'typeorm';
import {downloadGoogleAuthenticator, enterGoogleAuthenticator, invalidOTP,
  loginSuccess, ormDBName,
  otpExpire,
  otpLength,
  twoFactorAuthenticationMethod,
  twofaOtpSentmessage,
  unauthorizedClientMessage}
  from '../../config/bootstrap';
import {InvalidOTPException} from '../exception/InvalidOTPException';
import {UnauthorizedClientException}
  from '../exception/UnauthorizedClientException';
import {LoginSuccesResponse} from '../interface/types/Response';
import {TwoFactorAuth} from '../model/entity/TwoFactorAuth';
import {UserLoginLog} from '../model/entity/UserLoginLog';
import {RepositoryParameter}
  from '../model/repository/AppRepository';
import {TwoFactorAuths}
  from '../model/repository/TwoFactorAuths';
import {UserLoginLogs} from '../model/repository/UserLoginLogs';
import {MailService} from '../service/MailService';
import {ResponseService} from '../service/ResponseService';
import {OtpGenerator} from '../utils/OtpGenerator';
import {AppController} from './AppController';
import QRCode from 'qrcode';
import {authenticator} from 'otplib';
import {AdminLoginLog} from '../model/entity/AdminLoginLog';
import {AdminLoginLogs} from '../model/repository/AdminLoginLogs';
/**
 * Two factor authentication Controller
 * @class
 * @extends{AppController}
 */
export class TwoFactorAuthController extends AppController {
  /**
     * Database name
     * @var{string}
     */
  private _dataBaseName: string;
  /**
      * Constructor Method.
      * @constructor
      */
  constructor() {
    super('TwoFactorAuthController');
    this._dataBaseName = ormDBName;
  }
  /**
      * Create new entry in two factor authentication
      * @param{Request} req Request
      * @param{Response} res Response
      * @param{NextFunction} next Next Function
      */
  public create = async (
      req: Request, res: Response, next: NextFunction) => {
    try {
      let loginLog;
      const email : string = req.body.email;
      let isFirstTimeLogin: boolean = false;
      const twoFactorAuthRepoOptions: RepositoryParameter =
                new RepositoryParameter(
                    'twoFactorAuth',
                    TwoFactorAuth,
                    this._dataBaseName,
                    'none',
                    getConnection(this._dataBaseName),
                );
      const twoFactorAuthRepo: TwoFactorAuths =
                new TwoFactorAuths(twoFactorAuthRepoOptions);

      const newTwofactorAuthEntity = twoFactorAuthRepo.newEntity();
      if (twoFactorAuthenticationMethod==='google') {
        let googleotp: string;
        if (req.body.previous_login_log_id) {
          const previousOTP : string| boolean = await twoFactorAuthRepo
              .getPreviousGoogleAuthOTPByAdminLoginLogId(
                  req.body.previous_login_log_id);

          if (previousOTP) {
            // @ts-ignore
            googleotp = previousOTP;
          } else {
            googleotp = authenticator.generateSecret();
            isFirstTimeLogin = true;
          }
        } else {
          googleotp = authenticator.generateSecret();
          isFirstTimeLogin = true;
        }

        newTwofactorAuthEntity.otp = googleotp;
        newTwofactorAuthEntity.type = twoFactorAuthenticationMethod;
      } else {
        const otp : number = new OtpGenerator().randomOtp(otpLength);
        newTwofactorAuthEntity.otp = otp;
        newTwofactorAuthEntity.type = twoFactorAuthenticationMethod;
      }
      newTwofactorAuthEntity.expiry =
        new Date(moment().add(otpExpire, 'minutes').format());
      if (req.body.user_login_log) {
        loginLog = req.body.user_login_log;
        newTwofactorAuthEntity.userLoginLog = loginLog;
      }
      if (req.body.admin_login_log) {
        loginLog = req.body.admin_login_log;
        newTwofactorAuthEntity.adminLoginLog = loginLog;
      }
      const saved2FAEntity: TwoFactorAuth | boolean =
                await twoFactorAuthRepo.save(newTwofactorAuthEntity);
      if (saved2FAEntity) {
        if (twoFactorAuthenticationMethod==='email') {
          new MailService().sendOTP(email, newTwofactorAuthEntity.otp );
          res.setHeader('session', loginLog.id);
          new ResponseService().sendSuccessResponse(res, twofaOtpSentmessage);
        } else if (twoFactorAuthenticationMethod==='google') {
          if (!isFirstTimeLogin) {
            const url: string =
            await QRCode.toDataURL(
                authenticator.keyuri(email,
                    'ATLpay',
                    newTwofactorAuthEntity.otp));
            res.setHeader('session', loginLog.id);
            new ResponseService().sendSuccessResponse(res, {
              message: enterGoogleAuthenticator,
              qr: url,
            });
          } else {
            const url: string =
            await QRCode.toDataURL(
                authenticator.keyuri(email,
                    'ATLpay',
                    newTwofactorAuthEntity.otp));
            res.setHeader('session', loginLog.id);
            new ResponseService().sendSuccessResponse(res, {
              message: downloadGoogleAuthenticator,
              qr: url,
            });
          }
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error: any) {
      next(error);
    }
  };
    /**
     * Compare OTP
     * @param{Request} req Request
     * @param{Response} res Response
     * @param{NextFunction} next Next Function
     */
  public validate = async (
      req: Request, res: Response, next: NextFunction,
  ) => {
    try {
      let sessionData;
      let loginLogEntity;
      let jwt;
      const twoFactorAuthRepoOptions: RepositoryParameter =
                new RepositoryParameter(
                    'twoFactorAuth',
                    TwoFactorAuth,
                    this._dataBaseName,
                    'none',
                    getConnection(this._dataBaseName),
                );
      const twoFactorAuthRepo: TwoFactorAuths =
                new TwoFactorAuths(twoFactorAuthRepoOptions);
      const session: any = req.headers.session;
      const userOtp: string = req.body.otp;
      if (!(session && userOtp)) {
        throw new UnauthorizedClientException(unauthorizedClientMessage);
      }
      const userLoginLogParameter: RepositoryParameter =
          new RepositoryParameter(
              'authentication',
              UserLoginLog,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
      const adminLoginLogParameter: RepositoryParameter =
          new RepositoryParameter(
              'authentication',
              AdminLoginLog,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
      if (twoFactorAuthenticationMethod==='email') {
        const twoFactorAuthEntity: TwoFactorAuth =
          await twoFactorAuthRepo.getOnCondition({_otp: userOtp});
        if (twoFactorAuthEntity.adminLoginLog) {
          sessionData = twoFactorAuthEntity.adminLoginLog.id;
        }
        if (twoFactorAuthEntity.userLoginLog) {
          sessionData = twoFactorAuthEntity.userLoginLog.id;
        }
        if (twoFactorAuthEntity &&
          sessionData === session &&
            twoFactorAuthEntity.expiry > new Date()) {
          if (twoFactorAuthEntity.adminLoginLog) {
            const adminLoginLogRepo: AdminLoginLogs =
                new AdminLoginLogs(adminLoginLogParameter);
            loginLogEntity = await adminLoginLogRepo.get(session);
            jwt = JSON.parse(twoFactorAuthEntity.adminLoginLog.session);
          } else {
            const userLoginLogRepo: UserLoginLogs = new
            UserLoginLogs(userLoginLogParameter);
            loginLogEntity = await userLoginLogRepo.get(session);
            jwt = JSON.parse(twoFactorAuthEntity.userLoginLog.session);
          }

          if (! loginLogEntity) {
            throw new Error();
          }
          const successResponse : LoginSuccesResponse = {
            message: loginSuccess,
            jwt: jwt,
          };
          twoFactorAuthEntity.expiry = new Date();
          await twoFactorAuthRepo.save(twoFactorAuthEntity);
          if (loginLogEntity.adminAuthentication) {
            res.setHeader('user_id', loginLogEntity.adminAuthentication.id);
          } else {
            res.setHeader('user_id', loginLogEntity.userAuthentication.id);
          }
          new ResponseService().sendSuccessResponse(res, successResponse);
        } else {
          throw new InvalidOTPException(invalidOTP);
        }
      } else if (twoFactorAuthenticationMethod==='google') {
        const twoFactorAuthEntity: TwoFactorAuth[] =
          (await twoFactorAuthRepo.find()).filter((twofa: TwoFactorAuth)=>{
            return (twofa.userLoginLog && twofa.userLoginLog.id === session) ||
            (twofa.adminLoginLog && twofa.adminLoginLog.id === session);
          });
        if (twoFactorAuthEntity.length!=1) {
          throw new InvalidOTPException(invalidOTP);
        }
        if (!authenticator.check(userOtp, twoFactorAuthEntity[0].otp)) {
          throw new InvalidOTPException(invalidOTP);
        }

        if (twoFactorAuthEntity[0].userLoginLog) {
          jwt = twoFactorAuthEntity[0].userLoginLog.session;
        } else {
          jwt = twoFactorAuthEntity[0].adminLoginLog.session;
        }
        const successResponse : LoginSuccesResponse = {
          message: loginSuccess,
          jwt: JSON.parse(jwt),
        };
        twoFactorAuthEntity[0].expiry = new Date();
        await twoFactorAuthRepo.save(twoFactorAuthEntity);
        let loginLog : UserLoginLog | AdminLoginLog;
        if (twoFactorAuthEntity[0].userLoginLog) {
          const userLoginLogRepo: UserLoginLogs =
            new UserLoginLogs(userLoginLogParameter);
          loginLog =
            await userLoginLogRepo.get(session);
          // @ts-ignore
          res.setHeader('user_id', loginLog.userAuthentication.id);
        } else if (twoFactorAuthEntity[0].adminLoginLog) {
          const adminLoginLogRepo: AdminLoginLogs =
            new AdminLoginLogs(adminLoginLogParameter);
          loginLog =
            await adminLoginLogRepo.get(session);
          // @ts-ignore
          res.setHeader('user_id', loginLog.adminAuthentication.id);
        }
        // @ts-ignore
        if (! loginLog) {
          throw new Error();
        }
        new ResponseService().sendSuccessResponse(res, successResponse);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      next(error);
    }
  };
}


