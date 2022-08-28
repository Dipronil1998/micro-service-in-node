import {AppController} from './AppController';
import {NextFunction, Request, Response} from 'express';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {UserLoginLog} from '../model/entity/UserLoginLog';
import {getConnection, UpdateResult} from 'typeorm';
import {UserLoginLogs} from '../model/repository/UserLoginLogs';
import {ResponseService} from '../service/ResponseService';
import {
  httpDataNotFound,
  httpLoggedOutSucessfully,
  httpSuccessDataUpdate,
  invalidInputMessage,
  loginSuccess,
  ormDBName,
} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {JsonWebToken} from '../utils/JsonWebToken';
import {JWT, Payload} from '../interface/types/jwt';
import {LoginSuccesResponse} from '../interface/types/Response';
import {IpDataService} from '../service/IpDataService';
import {InvalidInputException} from '../exception/InvalidInputException';

/**
 * UserLoginLogController
 * @class
 * @extends{AppController}
 */
export class UserLoginLogController extends AppController {
  /**
   * database name
   * @var{any}
   */
  private _dataBaseName: any;
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('UserLoginLogController');
    this._dataBaseName = ormDBName;
  }
  /**
   * Insert UserLoginLog
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const userLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const userLoginLogRepo: UserLoginLogs = new UserLoginLogs(
          userLoginLogParameter,
      );
      userLoginLogRepo.initializeAssociations();
      const userLoginLog: UserLoginLog = userLoginLogRepo.newEntity();
      const ipDataService: IpDataService = new IpDataService();
      const realIP: any = req.headers['x-real-ip'];
      const ipdata = await ipDataService.clientIpData(realIP);
      userLoginLog.ipAddress = realIP || req.ip || '::1';

      if (ipdata) {
        userLoginLog.ipAddress = ipdata.ip;
        userLoginLog.lat = ipdata.latitude;
        userLoginLog.lng = ipdata.longitude;
        userLoginLog.city = ipdata.city;
        userLoginLog.region = ipdata.region;
        userLoginLog.postalCode = ipdata.postal;
        userLoginLog.asn = ipdata.asn.asn;
        userLoginLog.asnName = ipdata.asn.name;
        userLoginLog.asnDomain = ipdata.asn.domain;
        userLoginLog.asnType = ipdata.asn.type;
        userLoginLog.countryName = ipdata.country_name;
        userLoginLog.CountryIso2 = ipdata.country_code;
      }
      userLoginLog.userAuthentication = req.body.user_authentication;
      userLoginLog.device = req.body.device;
      const message: string = req.body.response_message;
      const accessRoleId = req.body.user_authentication.accessRole.id;
      const jwtPayLoad: Payload = {
        user_id: req.body.user_authentication.id,
        user_email: req.body.user_authentication.email,
        user_access_role_id: accessRoleId,
      };
      const jwt: JWT = new JsonWebToken().generateAccessToken(jwtPayLoad);
      userLoginLog.session = JSON.stringify(jwt);
      const createdUserLoginLog: any = await userLoginLogRepo.save(
          userLoginLog,
      );
      if (!createdUserLoginLog) {
        throw new Error();
      }
      if (message === loginSuccess) {
        req.body.user_login_log = createdUserLoginLog;
        next();
      } else {
        const response: LoginSuccesResponse = {
          message: message,
          jwt: new JsonWebToken().generateAccessToken(jwtPayLoad),
        };
        new ResponseService().sendSuccessResponse(res, response);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * find data for UserLoginLog
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const userLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const userLoginLogRepo: UserLoginLogs = new UserLoginLogs(
          userLoginLogParameter,
      );
      userLoginLogRepo.initializeAssociations();
      let usersLoginLogList: UserLoginLog[] = await userLoginLogRepo.find();
      if (usersLoginLogList.length != 0) {
        res.setHeader('Content-Type', 'application/json');
        usersLoginLogList = userLoginLogRepo.toJson(usersLoginLogList);
        new ResponseService().sendSuccessResponse(res, usersLoginLogList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for UserLoginLog
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const userLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const userLoginLogRepo: UserLoginLogs = new UserLoginLogs(
          userLoginLogParameter,
      );
      userLoginLogRepo.initializeAssociations();
      const email: string = req.params.email;
      let userLoginLogs: UserLoginLog[] =
        await userLoginLogRepo.getUserLoginLogByEmail(email);
      if (userLoginLogs.length != 0) {
        res.setHeader('Content-Type', 'application/json');
        userLoginLogs = userLoginLogRepo.toJson(userLoginLogs);
        new ResponseService().sendSuccessResponse(res, userLoginLogs);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get UserLoginLog By Id
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public getUserLoginLogById = async (
      req: Request,
      res: Response,
      next: NextFunction,
  ) => {
    this._request = req;
    this._response = res;
    try {
      const userLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const userLoginLogRepo: UserLoginLogs = new UserLoginLogs(
          userLoginLogParameter,
      );
      userLoginLogRepo.initializeAssociations();
      const id: string = req.params.id;
      let userLoginLogs: UserLoginLog[] =
        await userLoginLogRepo.getUserLoginLogById(id);
      if (userLoginLogs.length != 0) {
        res.setHeader('Content-Type', 'application/json');
        userLoginLogs = userLoginLogRepo.toJson(userLoginLogs);
        new ResponseService().sendSuccessResponse(res, userLoginLogs);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Update Accessed time
   * @param{Request} req
   * @param{Response} res
   * @param{NextFunction} next
   */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const userLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const userLoginLogRepo: UserLoginLogs = new UserLoginLogs(
          userLoginLogParameter,
      );
      userLoginLogRepo.initializeAssociations();
      const id = req.headers.id;
      const updateAccessed = await userLoginLogRepo.getOnCondition({_id: id});

      if (updateAccessed) {
        const updateResult = await userLoginLogRepo.updateAll(
            {_accessed: new Date()},
            {_id: id},
        );
        if (updateResult.affected !== 0) {
          new ResponseService().sendSuccessResponse(res, httpSuccessDataUpdate);
        } else {
          throw new Error();
        }
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * User Logout method
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public logout = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const userLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'authentication',
            UserLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const userLoginLogRepo: UserLoginLogs = new UserLoginLogs(
          userLoginLogParameter,
      );
      userLoginLogRepo.initializeAssociations();
      const session: any = req.headers.session;
      let userDetails: UserLoginLogs[] | boolean =
        await userLoginLogRepo.getOnCondition({_id: session});

      if (!userDetails) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      const userLoginLog: UserLoginLog = new UserLoginLog();
      userLoginLog.expiry = new Date();

      userDetails = await userLoginLogRepo
          .patchEntity(userDetails, userLoginLog);
      const updateSessionExpirity: UpdateResult =
        await userLoginLogRepo.updateAll(userDetails, {_id: session});
      if (updateSessionExpirity) {
        new ResponseService()
            .sendSuccessResponse(res, httpLoggedOutSucessfully);
      } else {
        throw new InvalidInputException(invalidInputMessage);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
