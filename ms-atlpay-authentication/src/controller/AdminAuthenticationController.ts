import {NextFunction, Request, Response} from 'express';
import {getConnection, UpdateResult} from 'typeorm';
import {
  adminAdded,
  currentAndNewPasswordMatchError,
  emailAvailable,
  httpDataNotFound,
  httpEmailAlreadyExsits,
  httpSuccessDataUpdate,
  invalidInputMessage,
  loginSuccess,
  missingAuthenticationToken,
  ormDBName,
  passwordUpdatedSucessfully,
  suspendAccountSuccessfully,
  unauthorizedClientMessage,
  userSuspendAccount,
} from '../../config/bootstrap';
import {AccessRole} from '../model/entity/AccessRole';
import {EmailAlreadyExsistException}
  from '../exception/EmailAlreadyExsistException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {
  incorrectPassword,
  userBlockAccount,
  userDataNotFound,
} from '../../config/bootstrap';
import {IncorrectPasswordException}
  from '../exception/IncorrectPasswordException';
import {UserBlockException} from '../exception/UserBlockException';
import {UserNotFoundException} from '../exception/UserNotFoundException';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {ResponseService} from '../service/ResponseService';
import {CurrentAndNewPasswordMatchException}
  from '../exception/CurrentAndNewPasswordMatchException';
import {UnauthorizedClientException}
  from '../exception/UnauthorizedClientException';
import {AdminAuthentications} from '../model/repository/AdminAuthentications';
import {AdminAuthentication} from '../model/entity/AdminAuthentication';
import {GenerateToken} from '../utils/GenerateToken';
import {MailService} from '../service/MailService';
import {UserSuspendedException} from '../exception/UserSuspendedException';
import {JwtPayload} from 'jsonwebtoken';
import {JsonWebToken} from '../utils/JsonWebToken';
import {MissingAuthenticationTokenException} from
  '../exception/MissingAuthenticationTokenException';

/**
 * AdminAuthenticationController
 * @class
 * @extends{AppController}
 */
export class AdminAuthenticationController extends AppController {
  /**
   * Database name
   * @var{any}
   */
  private _dataBaseName: any;
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('AdminAuthenticationController');
    this._dataBaseName = ormDBName;
  }
  /**
   * Create new Admin
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'adminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications =
        new AdminAuthentications(authParameter);
      authRepo.initializeAssociations();
      const adminAuthentication: AdminAuthentication = authRepo.newEntity();

      const firstName: string = req.body.first_name;
      const middleName: string = req.body.middle_name;
      const lastName: string = req.body.last_name;
      const email: string = req.body.email;
      const password: string = new GenerateToken().generateRandomToken(10);
      const isAdmin: boolean = true;

      const admin: AdminAuthentication | boolean =
        await authRepo.getOnCondition({_email: email});
      if (admin) {
        throw new EmailAlreadyExsistException(httpEmailAlreadyExsits);
      } else {
        adminAuthentication.firstName = firstName;
        adminAuthentication.middleName = middleName;
        adminAuthentication.lastName = lastName;
        adminAuthentication.email = email;
        adminAuthentication.password =
          await authRepo.bcryptPassword(password);

        if (isAdmin) {
          const administratorAccessRole: AccessRole | undefined =
            await authRepo.getAdministratorAccessRole();
          if (administratorAccessRole instanceof AccessRole) {
            adminAuthentication.accessRole = administratorAccessRole;
          }
        } else {
          throw new Error();
        }
      }
      const createAdmin: AdminAuthentication | boolean =
        await authRepo.save(adminAuthentication);
      if (createAdmin instanceof AdminAuthentication) {
        new MailService().sendAdminLoginInfo(email, password);
        new ResponseService().sendSuccessResponse(res, adminAdded);
      } else {
        throw new InvalidInputException('Invalid Input');
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Admin Login
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'authentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepository: AdminAuthentications =
        new AdminAuthentications(authParameter);
      authRepository.initializeAssociations();
      const adminAuthentication: AdminAuthentication =
        authRepository.newEntity();
      const email: string = req.body.email;
      const password: string = req.body.password;
      adminAuthentication.email = email;
      adminAuthentication.password = password;

      const admin: AdminAuthentication | boolean =
        await authRepository.getOnCondition({_email: email});
      if (!(admin instanceof AdminAuthentication)) {
        const userNotFoundException: UserNotFoundException =
          new UserNotFoundException(userDataNotFound);
        throw userNotFoundException;
      }

      if (!(
        admin.accessRole.title === 'Administrator' ||
          admin.accessRole.title === 'Super Administrator'
      )) {
        throw new UnauthorizedClientException(unauthorizedClientMessage);
      }

      const comparePassword: boolean =
      await authRepository.comparePassword(password, admin.password);
      if (!comparePassword) {
        const incorrectPasswordException: IncorrectPasswordException =
          new IncorrectPasswordException(incorrectPassword);
        throw incorrectPasswordException;
      }

      if (
        admin.allowLogin === true &&
        admin.accountStatus.toLowerCase() === 'live' &&
        admin.blockUntil < new Date()
      ) {
        req.body.user_authentication = admin;
        req.body.response_message = loginSuccess;
        next();
      } else if (admin.accountStatus.toLowerCase() === 'block') {
        const userBlockException: UserBlockException = new UserBlockException(
            userBlockAccount,
        );
        throw userBlockException;
      } else {
        throw new UserSuspendedException(userSuspendAccount);
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * update Admin
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications =
        new AdminAuthentications(authParameter);
      authRepo.initializeAssociations();
      const id: string = req.params.id;
      let authentication: AdminAuthentications =
        await authRepo.getOnCondition({_id: id});
      const firstName: string = req.body.first_name;
      const middleName: string = req.body.middle_name;
      const lastName: string = req.body.last_name;
      const authenticationUpdate: AdminAuthentication =
        new AdminAuthentication();
      if (firstName) {
        authenticationUpdate.firstName = firstName;
      }
      if (middleName) {
        authenticationUpdate.middleName = middleName;
      }
      if (lastName) {
        authenticationUpdate.lastName = lastName;
      }

      authentication = await authRepo.patchEntity(
          authentication,
          authenticationUpdate,
      );
      const updateauthenticationResult: UpdateResult = await authRepo.updateAll(
          authentication,
          {_id: id},
      );
      const noOfRowsAffected: number | undefined =
        updateauthenticationResult.affected;
      if (noOfRowsAffected) {
        new ResponseService().sendSuccessResponse(res, httpSuccessDataUpdate);
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        next(dataNotFoundException);
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * Change Password Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public changePassword = async (
      req: Request,
      res: Response,
      next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications = new AdminAuthentications(
          authParameter,
      );
      authRepo.initializeAssociations();

      const passwordUpdatedAdmin: AdminAuthentication =
        new AdminAuthentication();
      const id: string = req.params.id;
      let adminAuthentication: AdminAuthentications =
        await authRepo.getOnCondition({_id: id});
      const currentPassword: string = req.body.current_password;
      const newPassword: string = req.body.new_password;

      if (!(adminAuthentication instanceof AdminAuthentication)) {
        const userNotFoundException: UserNotFoundException =
          new UserNotFoundException(userDataNotFound);
        throw userNotFoundException;
      }

      if (
        !(
          adminAuthentication.allowLogin === true &&
          adminAuthentication.accountStatus.toLowerCase() === 'live' &&
          adminAuthentication.blockUntil < new Date()
        )
      ) {
        const userBlockException: UserBlockException = new UserBlockException(
            userBlockAccount,
        );
        throw userBlockException;
      }

      const comparePassword: boolean = await authRepo.comparePassword(
          currentPassword,
          adminAuthentication.password,
      );

      if (!comparePassword) {
        const incorrectPasswordException: IncorrectPasswordException =
          new IncorrectPasswordException(incorrectPassword);
        throw incorrectPasswordException;
      }

      if (newPassword === currentPassword) {
        throw new CurrentAndNewPasswordMatchException(
            currentAndNewPasswordMatchError,
        );
      }

      passwordUpdatedAdmin.password = await
      authRepo.bcryptPassword(newPassword);
      passwordUpdatedAdmin.lastPasswordModified = new Date();
      adminAuthentication = await authRepo.patchEntity(
          adminAuthentication,
          passwordUpdatedAdmin,
      );
      const updateResult: UpdateResult = await authRepo.updateAll(
          adminAuthentication,
          {_id: id},
      );
      if (updateResult.affected) {
        new ResponseService().sendSuccessResponse(
            res,
            passwordUpdatedSucessfully,
        );
      } else {
        const invalidInputException: InvalidInputException =
          new InvalidInputException(invalidInputMessage);
        throw invalidInputException;
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * Block Admin
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public blockAdmin = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    try {
      const blockUntil: Date = new Date(request.body.block_until);
      await this.changeAdminStatus(
          request,
          response,
          'BLOCK',
          false,
          blockUntil,
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * Unblock Admin
   * @param{Request} request - Request
   * @param{Response} response - Response
   * @param{NextFunction} next - Next Function
   */
  public unBlockAdmin = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    try {
      await this.changeAdminStatus(request, response, 'LIVE', true, null);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Suspend Admin
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public suspend = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    try {
      await this.changeAdminStatus(request, response, 'SUSPENDED', false, null);
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Change Admin Block Status
   * @param{Request} request
   * @param{Response} response
   * @param{string} blockStatus
   * @param{boolean} allowLogin
   * @param{any} blockUntil
   */
  private changeAdminStatus = async (
      request: Request,
      response: Response,
      blockStatus: string,
      allowLogin: boolean,
      blockUntil: any,
  ) => {
    this._request = request;
    this._response = response;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications = new AdminAuthentications(
          authParameter,
      );
      const id: string = request.params.id;
      const updateResult: UpdateResult = await authRepo.updateAll(
          {
            _accountStatus: blockStatus,
            _allowLogin: allowLogin,
            _blockUntil: blockUntil,
          },
          {_id: id},
      );
      if (updateResult.affected !== 0 && blockStatus === 'SUSPENDED') {
        new ResponseService().sendSuccessResponse(
            response,
            suspendAccountSuccessfully,
        );
      } else if (updateResult.affected !== 0) {
        new ResponseService().sendSuccessResponse(
            response,
            httpSuccessDataUpdate,
        );
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * Check Email is Present
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public checkEmailExist = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    this._request = request;
    this._response = response;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications = new AdminAuthentications(
          authParameter,
      );

      const email: string = request.params.email;
      const emailExist: boolean = await authRepo.exists({_email: email});
      if (emailExist) {
        throw new EmailAlreadyExsistException(httpEmailAlreadyExsits);
      } else {
        new ResponseService().sendSuccessResponse(response, emailAvailable);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * find data for Admin
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications = new AdminAuthentications(
          authParameter,
      );
      authRepo.initializeAssociations();
      // @ts-ignore
      const status : string = req.query.status || 'ALL';
      let adminList: AdminAuthentication[] = await authRepo
          .findbasedOnstatus(status);
      if (adminList.length != 0) {
        adminList = authRepo.toJson(adminList);
        new ResponseService().sendSuccessResponse(res, adminList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for Admin
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications = new AdminAuthentications(
          authParameter,
      );
      authRepo.initializeAssociations();
      const id: string = req.params.id;
      let adminDetails: AdminAuthentication[] = await authRepo.getOnCondition({
        _id: id,
      });
      if (adminDetails && adminDetails.length != 0) {
        adminDetails = authRepo.toJson(adminDetails);
        new ResponseService().sendSuccessResponse(res, adminDetails);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Check Admin Status Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public checkAdminStatus = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'AdminAuthentication',
          AdminAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: AdminAuthentications =
    new AdminAuthentications(authParameter);
      authRepo.initializeAssociations();

      const email: string = req.body.email;
      const adminAuthentication: AdminAuthentication =
      await authRepo.getOnCondition({_email: email});

      if (adminAuthentication instanceof AdminAuthentication) {
        if (adminAuthentication.allowLogin === true &&
        adminAuthentication.accountStatus.toLowerCase() === 'live' &&
        adminAuthentication.blockUntil < new Date()) {
          req.body.admin_authentication = adminAuthentication;
          next();
        } else {
          throw new UserBlockException(userBlockAccount);
        }
      } else {
        throw new UserNotFoundException(userDataNotFound);
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * Reset Password Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public resetPassword =
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
      this._request = req;
      this._response = res;
      try {
        const authParameter: RepositoryParameter = new RepositoryParameter(
            'AdminAuthentication',
            AdminAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
        const authRepo: AdminAuthentications =
        new AdminAuthentications(authParameter);
        authRepo.initializeAssociations();

        const passwordResetAdmin: AdminAuthentication =
          new AdminAuthentication();
        const id: string = req.body.id;

        let adminAuthentication: AdminAuthentications =
        await authRepo.getOnCondition({_id: id});
        const newPassword: string = req.body.new_password;

        if (adminAuthentication instanceof AdminAuthentication) {
          passwordResetAdmin.password =
            await authRepo.bcryptPassword(newPassword);
          passwordResetAdmin.lastPasswordModified = new Date();
          adminAuthentication = await authRepo.patchEntity(
              adminAuthentication,
              passwordResetAdmin,
          );
          const updateResult: UpdateResult =
        await authRepo.updateAll(
            adminAuthentication, {_id: id});
          if (updateResult.affected) {
            new ResponseService()
                .sendSuccessResponse(res, passwordUpdatedSucessfully);
            next();
          } else {
            throw new InvalidInputException(invalidInputMessage);
          }
        } else {
          const userNotFoundException: UserNotFoundException =
          new UserNotFoundException(userDataNotFound);
          throw userNotFoundException;
        }
      } catch (err) {
        next(err);
      }
    };

  /**
   * Validate JWT Access Token.
   * @param{Request} request - Request
   * @param{Response} response - Response
   * @param{NextFunction} next - Next Middleware
   */
  public verifyJWToken =
    (request: Request, response: Response, next: NextFunction) => {
      const authenticationHeader: string | undefined =
      request.headers?.authorization;

      if (authenticationHeader) {
        const token: string = authenticationHeader.split(' ')[1];
        try {
          const decode: string | JwtPayload =
          new JsonWebToken().verifyAccessToken(token);
          response.setHeader('user', JSON.stringify(decode));
          new ResponseService().sendSuccessResponse(response, decode);
        } catch (error) {
          const unauthorizedClientException:
          UnauthorizedClientException =
          new UnauthorizedClientException(unauthorizedClientMessage);
          new ResponseService()
              .sendErrorResponse(response, unauthorizedClientException);
        }
      } else {
        const missingAuthToken:
        MissingAuthenticationTokenException =
        new MissingAuthenticationTokenException(missingAuthenticationToken);
        new ResponseService().sendErrorResponse(response, missingAuthToken);
      }
    };
}
