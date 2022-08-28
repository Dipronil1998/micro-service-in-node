import {Request, Response, NextFunction} from 'express';
import moment from 'moment';
import {getConnection} from 'typeorm';
import {
  dateTimeFormat,
  emailSendedSucessfully, expireTokenTimeInMinutes,
  generalServerErrorMessage, invalidInputMessage, ormDBName,
  resetPasswordLinkExpired,
  resetPasswordTokenLength,
  userDataNotFound,
}
  from '../../config/bootstrap';
import {BaseException} from '../exception/BaseException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {PasswordResetLinkExpireException}
  from '../exception/PasswordResetLinkExpireException';
import {UserNotFoundException} from '../exception/UserNotFoundException';
import {AdminAuthentication} from '../model/entity/AdminAuthentication';
import {ResetPasswordToken} from '../model/entity/ResetPasswordToken';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {ResetPasswordTokens} from '../model/repository/ResetPasswordTokens';
import {MailService} from '../service/MailService';
import {ResponseService} from '../service/ResponseService';
import {GenerateToken} from '../utils/GenerateToken';
import {AppController} from './AppController';

/**
 * Admin Reset Password Controller
 * @class
 * @extends{AppController}
 */
export class AdminResetPasswordController extends AppController {
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
    super('AdminResetPasswordController');
    this._dataBaseName = ormDBName;
  }

  /**
   * Create Reset Password Token Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public createResetPasswordToken = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const resetPasswordParameter =
        new RepositoryParameter(
            'resetPasswordToken',
            ResetPasswordToken,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const resetPasswordTokenRepo: ResetPasswordTokens =
        new ResetPasswordTokens(resetPasswordParameter);
      resetPasswordTokenRepo.initializeAssociations();

      const tokenExpireTimeInMinutes: number = expireTokenTimeInMinutes;
      const token: string = new GenerateToken()
          .generateRandomToken(resetPasswordTokenLength);

      const expireTime: any = moment().add(tokenExpireTimeInMinutes, 'minutes')
          .format(dateTimeFormat);
      const adminAuthentication: AdminAuthentication =
        req.body.admin_authentication;

      const resetPasswordToken: ResetPasswordToken = new ResetPasswordToken();
      resetPasswordToken.token = token;
      resetPasswordToken.tokenExpireTime = expireTime;
      resetPasswordToken.adminAuthentication = adminAuthentication;

      const saveResetPassword: ResetPasswordToken | boolean =
        await resetPasswordTokenRepo.save(resetPasswordToken);
      if (saveResetPassword) {
        req.body.token = token;
        next();
      } else {
        throw new BaseException(generalServerErrorMessage);
      }
    } catch (err) {
      next(err);
    }
  };

  /**
  * Send Reset Password Mail Method
  * @param{Request} req Request
  * @param{Response} res Response
  * @param{NextFunction} next Next Function
  */
  public sendResetPasswordMail = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const email: string = req.body.email;
      const token: string = req.body.token;
      const mailService: MailService = new MailService();

      mailService.sendResetPasswordEmailToken(email, token);
      new ResponseService()
          .sendSuccessResponse(res, emailSendedSucessfully);
    } catch (err: any) {
      next(err);
    }
  };

  /**
    * Check Reset Token Method
    * @param{Request} req Request
    * @param{Response} res Response
    * @param{NextFunction} next Next Function
    */
  public checkResetToken = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const resetPasswordParameter =
        new RepositoryParameter(
            'resetPasswordToken',
            ResetPasswordToken,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const resetPasswordTokenRepo: ResetPasswordTokens =
        new ResetPasswordTokens(resetPasswordParameter);
      resetPasswordTokenRepo.initializeAssociations();

      const resetToken: string = req.params.token;
      const isvalidToken: boolean = await resetPasswordTokenRepo
          .isTokenValid(resetToken);
      if (isvalidToken) {
        const userId: string = await resetPasswordTokenRepo
            .getAdminIdFromToken(resetToken);
        if (userId) {
          req.body.id = userId;
          req.body.token = resetToken;
          next();
        } else {
          throw new UserNotFoundException(userDataNotFound);
        }
      } else {
        throw new PasswordResetLinkExpireException(resetPasswordLinkExpired);
      }
    } catch (err) {
      next(err);
    }
  };

  /**
    * Change Token Status Method
    * @param{Request} req Request
    * @param{Response} res Response
    * @param{NextFunction} next Next Function
    */
  public changeTokenStatus = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const resetPasswordParameter =
        new RepositoryParameter(
            'resetPasswordToken',
            ResetPasswordToken,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const resetPasswordTokenRepo: ResetPasswordTokens =
        new ResetPasswordTokens(resetPasswordParameter);
      resetPasswordTokenRepo.initializeAssociations();

      const token: string = req.body.token;
      let resetPasswordToken: ResetPasswordToken =
        await resetPasswordTokenRepo.getOnCondition({_token: token});
      const makeInvaliToken: ResetPasswordToken = new ResetPasswordToken();

      if (resetPasswordToken instanceof ResetPasswordToken) {
        makeInvaliToken.isValidToken = false;
        resetPasswordToken = await resetPasswordTokenRepo
            .patchEntity(resetPasswordToken, makeInvaliToken);
        await resetPasswordTokenRepo.updateAll(
            resetPasswordToken, {_token: token});
      } else {
        throw new InvalidInputException(invalidInputMessage);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
