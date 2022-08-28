import {NextFunction, Request, Response} from 'express';
import {getConnection, UpdateResult} from 'typeorm';
import {
  currentAndNewPasswordMatchError,
  emailAndRecoveryEmailMatchError,
  emailAvailable,
  httpDataNotFound, httpEmailAlreadyExsits,
  httpSuccessDataUpdate, httpUserNameAlreadyExsits, invalidInputMessage,
  missingAuthenticationToken, loginSuccess,
  ormDBName, passwordUpdatedSucessfully,
  unauthorizedClientMessage, userCreated, userNameAvailable,
  userSuspendAccount, suspendAccountSuccessfully,
} from '../../config/bootstrap';
import {EmailAlreadyExsistException}
  from '../exception/EmailAlreadyExsistException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {incorrectPassword, userBlockAccount, userDataNotFound}
  from '../../config/bootstrap';
import {IncorrectPasswordException}
  from '../exception/IncorrectPasswordException';
import {UserBlockException} from '../exception/UserBlockException';
import {UserNotFoundException} from '../exception/UserNotFoundException';
import {UserAuthentication} from '../model/entity/UserAuthentication';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {UsersAuthentications} from '../model/repository/UsersAuthentications';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {JsonWebToken} from '../utils/JsonWebToken';
import {MissingAuthenticationTokenException}
  from '../exception/MissingAuthenticationTokenException';
import {UnauthorizedClientException}
  from '../exception/UnauthorizedClientException';
import {AccessRole} from '../model/entity/AccessRole';
import {JwtPayload} from 'jsonwebtoken';
import {EmailAndRecoveryEmailMatchException}
  from '../exception/EmailAndRecoveryEmailMatchException';
import {CurrentAndNewPasswordMatchException}
  from '../exception/CurrentAndNewPasswordMatchException';
import {UserNameAlreadyExsistException} from
  '../exception/UserNameAlreadyExsistException';
import {UserSuspendedException} from '../exception/UserSuspendedException';

/**
 * UserAuthenticationController
 * @class
 * @extends{AppController}
 */
export class UserAuthenticationController extends AppController {
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
    super('UserAuthenticationController');
    this._dataBaseName = ormDBName;
  }
  /**
  * Create new User
  * @param{Request} req - Request
  * @param{Response} res - Response
  * @param{NextFunction} next - next function
  */
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'authentication',
          UserAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();
      const userAuthentication: UserAuthentication = authRepo.newEntity();

      const firstName: string = req.body.first_name;
      const middleName: string = req.body.middle_name;
      const lastName: string = req.body.last_name;
      const userName: string = req.body.user_name;
      const email: string = req.body.email;
      const recoveryEmail: string = req.body.recovery_email;
      const password: string = req.body.password;
      const pin: string = req.body.pin;
      const isdCode: number = req.body.isd_code;
      const mobileNo: bigint = req.body.mobile_no;
      const isAdmin: boolean = req.body.is_admin || false;

      const user: UserAuthentication | boolean =
        await authRepo.getOnCondition({_email: email});
      if (user) {
        throw new EmailAlreadyExsistException(httpEmailAlreadyExsits);
      } else {
        userAuthentication.uin = authRepo.randomUin();
        userAuthentication.firstName = firstName;
        userAuthentication.middleName = middleName;
        userAuthentication.lastName = lastName;
        userAuthentication.userName = userName;
        userAuthentication.email = email;
        userAuthentication.recoveryEmail = recoveryEmail;
        userAuthentication.password =
          await authRepo.bcryptPassword(password);
        if (req.body.pin != undefined) {
          userAuthentication.pin = await authRepo.bcryptPin(pin);
        }
        userAuthentication.isdCode = isdCode;
        userAuthentication.mobileNo = mobileNo;
        if (isAdmin == false) {
          const marchantAccessRole: AccessRole | undefined =
            await authRepo.getMerchantAccessRole();
          if (marchantAccessRole instanceof AccessRole) {
            userAuthentication.accessRole = marchantAccessRole;
          }
        } else {
          const administratorAccessRole: AccessRole | undefined =
            await authRepo.getAdministratorAccessRole();
          if (administratorAccessRole instanceof AccessRole) {
            userAuthentication.accessRole = administratorAccessRole;
          }
        }
      }
      const createUser: UserAuthentication | boolean =
        await authRepo.save(userAuthentication);
      if (createUser instanceof UserAuthentication) {
        req.body.user_authentication = createUser;
        req.body.response_message = userCreated;
        next();
      } else {
        throw new InvalidInputException('Invalid Input');
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * User Login
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public login =
    async (req: Request,
        res: Response,
        next: NextFunction) => {
      this._request = req;
      this._response = res;
      try {
        const authParameter: RepositoryParameter = new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
        const authRepo: UsersAuthentications =
          new UsersAuthentications(authParameter);
        authRepo.initializeAssociations();
        const userAuthentication: UserAuthentication = authRepo.newEntity();

        const email: string = req.body.email;
        const password: string = req.body.password;
        userAuthentication.email = email;
        userAuthentication.password = password;

        const user: UserAuthentication | boolean =
          await authRepo.getOnCondition({_email: email});

        if (! (user instanceof UserAuthentication)) {
          const userNotFoundException: UserNotFoundException =
            new UserNotFoundException(userDataNotFound);
          throw userNotFoundException;
        }

        if (user.accessRole.title!=='Merchant') {
          throw new UnauthorizedClientException(unauthorizedClientMessage);
        }

        const comparePassword: boolean =
            await authRepo.comparePassword(password, user.password);
        if (! comparePassword ) {
          const incorrectPasswordException: IncorrectPasswordException =
              new IncorrectPasswordException(incorrectPassword);
          throw incorrectPasswordException;
        }

        if (user.allowLogin === true &&
          user.accountStatus.toLowerCase() === 'live' &&
          user.blockUntil < new Date()) {
          req.body.user_authentication = user;
          req.body.response_message = loginSuccess;
          next();
        } else if (user.accountStatus.toLowerCase() === 'block') {
          const userBlockException: UserBlockException =
            new UserBlockException(userBlockAccount);
          throw userBlockException;
        } else {
          throw new UserSuspendedException(userSuspendAccount);
        }
      } catch (error) {
        next(error);
      }
    };

  /**
   * find data for Users
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'authentication',
          UserAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();
      let userList: UserAuthentication[] = await authRepo.find();
      if (userList.length != 0) {
        userList = authRepo.toJson(userList);
        new ResponseService().sendSuccessResponse(res, userList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for User
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter = new RepositoryParameter(
          'authentication',
          UserAuthentication,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      const id: string = req.params.id;
      let userDetails: UserAuthentication[] =
        await authRepo.getOnCondition({_id: id});
      if (userDetails && userDetails.length != 0) {
        userDetails = authRepo.toJson(userDetails);
        new ResponseService().sendSuccessResponse(res, userDetails);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * update data for User
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();
      const id: string = req.params.id;
      let authentication: UsersAuthentications =
        await authRepo.getOnCondition({_id: id});
      const user = await authRepo.getUserById(id);
      const userEmail = user?.email;

      if (user) {
        const firstName: string = req.body.first_name;
        const middleName: string = req.body.middle_name;
        const lastName: string = req.body.last_name;
        const recoveryEmail: string = req.body.recovery_email;
        const isdCode: number = req.body.isd_code;
        const mobileNo: bigint = req.body.mobile_no;
        const authenticationUpdate: UserAuthentication =
          new UserAuthentication();
        if (firstName) {
          authenticationUpdate.firstName = firstName;
        } if (middleName) {
          authenticationUpdate.middleName = middleName;
        } if (lastName) {
          authenticationUpdate.lastName = lastName;
        } if (recoveryEmail !== userEmail) {
          if (recoveryEmail) {
            authenticationUpdate.recoveryEmail = recoveryEmail;
          }
        } else {
          throw new EmailAndRecoveryEmailMatchException(
              emailAndRecoveryEmailMatchError);
        } if (isdCode) {
          authenticationUpdate.isdCode = isdCode;
        } if (mobileNo) {
          authenticationUpdate.mobileNo = mobileNo;
        }

        authentication = await authRepo
            .patchEntity(authentication, authenticationUpdate);
        const updateauthenticationResult: UpdateResult =
          await authRepo.updateAll(authentication, {_id: id});
        const noOfRowsAffected: number | undefined =
          updateauthenticationResult.affected;
        if (noOfRowsAffected) {
          new ResponseService()
              .sendSuccessResponse(res, httpSuccessDataUpdate);
        } else {
          const dataNotFoundException: DataNotFoundException =
            new DataNotFoundException(httpDataNotFound);
          next(dataNotFoundException);
        }
      } else {
        throw new UserNotFoundException(userDataNotFound);
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

  /**
   * Change Password Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public changePassword = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();

      const passwordUpdate: UserAuthentication =
        new UserAuthentication();
      const id: string = req.params.id;
      let userAuthentication: UsersAuthentications =
        await authRepo.getOnCondition({_id: id});
      const currentPassword: string = req.body.current_password;
      const newPassword: string = req.body.new_password;

      if (!(userAuthentication instanceof UserAuthentication)) {
        const userNotFoundException: UserNotFoundException =
          new UserNotFoundException(userDataNotFound);
        throw userNotFoundException;
      }

      if (!(userAuthentication.allowLogin === true &&
        userAuthentication.accountStatus.toLowerCase() === 'live' &&
        userAuthentication.blockUntil < new Date())) {
        const userBlockException: UserBlockException =
            new UserBlockException(userBlockAccount);
        throw userBlockException;
      }

      const comparePassword: boolean = await authRepo
          .comparePassword(currentPassword, userAuthentication.password);
      if (! comparePassword) {
        const incorrectPasswordException: IncorrectPasswordException =
              new IncorrectPasswordException(incorrectPassword);
        throw incorrectPasswordException;
      }

      if (newPassword === currentPassword) {
        throw new CurrentAndNewPasswordMatchException(
            currentAndNewPasswordMatchError);
      }

      passwordUpdate.password =
        await authRepo.bcryptPassword(newPassword);
      passwordUpdate.lastPasswordModified = new Date();

      userAuthentication = await authRepo
          .patchEntity(userAuthentication, passwordUpdate);
      const updateResult: UpdateResult =
        await authRepo.updateAll(userAuthentication, {_id: id});
      if (updateResult.affected) {
        new ResponseService()
            .sendSuccessResponse(res, passwordUpdatedSucessfully);
      } else {
        const invalidInputException: InvalidInputException =
          new InvalidInputException(invalidInputMessage);
        next(invalidInputException);
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * Check User Status Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public checkUserStatus = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();
      const email: string = req.body.email;
      const userAuthentication: UsersAuthentications =
        await authRepo.getOnCondition({_email: email});
      if (userAuthentication instanceof UserAuthentication) {
        if (userAuthentication.allowLogin === true &&
          userAuthentication.accountStatus.toLowerCase() === 'live' &&
          userAuthentication.blockUntil < new Date()) {
          req.body.user_authentication = userAuthentication;
          next();
        } else {
          throw new UserBlockException(userBlockAccount);
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
   * Reset Password Method
   * @param{Request} req Request
   * @param{Response} res Response
   * @param{NextFunction} next Next Function
   */
  public resetPassword = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);
      authRepo.initializeAssociations();

      const passwordReset: UserAuthentication =
        new UserAuthentication();
      const id: string = req.body.id;

      let userAuthentication: UsersAuthentications =
        await authRepo.getOnCondition({_id: id});
      const newPassword: string = req.body.new_password;

      if (userAuthentication instanceof UserAuthentication) {
        passwordReset.password =
          await authRepo.bcryptPassword(newPassword);
        passwordReset.lastPasswordModified = new Date();

        userAuthentication = await authRepo
            .patchEntity(userAuthentication, passwordReset);
        const updateResult: UpdateResult =
          await authRepo.updateAll(userAuthentication, {_id: id});
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
  * Block User
  * @param{Request} request
  * @param{Response} response
  * @param{NextFunction} next
  */
  public blockUser = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      const blockUntil: Date = new Date(request.body.block_until);
      await this.changeUserStatus(
          request, response,
          'BLOCK', false,
          blockUntil);
    } catch (error) {
      next(error);
    }
  };

  /**
* Unblock User
* @param{Request} request - Request
* @param{Response} response - Response
* @param{NextFunction} next - Next Function
*/
  public unBlockUser = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      await this.changeUserStatus(
          request, response,
          'LIVE',
          true,
          null);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Suspend User
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public suspend = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      await this.changeUserStatus(request, response, 'SUSPENDED', false, null);
    } catch (error: any) {
      next(error);
    }
  };

  /**
* Change Block Status
* @param{Request} request
* @param{Response} response
* @param{boolean} blockStatus
* @param{boolean} allowLogin
* @param{any} blockUntil
*/
  private changeUserStatus = async (request: Request,
      response: Response,
      blockStatus: string, allowLogin: boolean,
      blockUntil: any) => {
    this._request = request;
    this._response = response;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);

      const id: string = request.params.id;
      const updateResult: UpdateResult = await authRepo
          .updateAll({
            _accountStatus: blockStatus,
            _allowLogin: allowLogin,
            _blockUntil: blockUntil,
          },
          {_id: id});
      if (updateResult.affected !== 0 && blockStatus === 'SUSPENDED') {
        new ResponseService().sendSuccessResponse(
            response, suspendAccountSuccessfully);
      } else if (updateResult.affected !== 0) {
        new ResponseService().sendSuccessResponse(
            response, httpSuccessDataUpdate);
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
  public checkEmailExist = async (request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);

      const email: string = request.params.email;
      const emailExist: boolean = await authRepo.exists({_email: email});
      if (emailExist) {
        throw new EmailAlreadyExsistException(httpEmailAlreadyExsits);
      } else {
        new ResponseService()
            .sendSuccessResponse(response, emailAvailable);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Check Username is Present
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public checkUserNameExist = async (request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const authParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserAuthentication,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const authRepo: UsersAuthentications =
        new UsersAuthentications(authParameter);

      const userName: string = request.params.username;
      const userNameExist: boolean = await authRepo
          .exists({_userName: userName});
      if (userNameExist) {
        throw new UserNameAlreadyExsistException(httpUserNameAlreadyExsits);
      } else {
        new ResponseService()
            .sendSuccessResponse(response, userNameAvailable);
      }
    } catch (error: any) {
      next(error);
    }
  };
}
