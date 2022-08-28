import {AppController} from './AppController';
import {NextFunction, Request, Response} from 'express';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {getConnection, UpdateResult} from 'typeorm';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, httpLoggedOutSucessfully,
  invalidInputMessage, loginSuccess, ormDBName}
  from '../../config/bootstrap';
import {JsonWebToken} from '../utils/JsonWebToken';
import {JWT, Payload} from '../interface/types/jwt';
import {LoginSuccesResponse} from '../interface/types/Response';
import {IpDataService} from '../service/IpDataService';
import {AdminLoginLog} from '../model/entity/AdminLoginLog';
import {AdminLoginLogs} from '../model/repository/AdminLoginLogs';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';

/**
 * AdminLoginLogController
 * @class
 * @extends{AppController}
 */
export class AdminLoginLogController extends AppController {
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
    super('AdminLoginLogController');
    this._dataBaseName = ormDBName;
  }
  /**
   * Insert AdminLoginLog
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const adminLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'AdminLoginLog',
            AdminLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const adminLoginLogRepo: AdminLoginLogs =
        new AdminLoginLogs(adminLoginLogParameter);
      adminLoginLogRepo.initializeAssociations();
      const adminLoginLog: AdminLoginLog = adminLoginLogRepo.newEntity();
      const ipDataService: IpDataService = new IpDataService();
      const realIP: any = req.headers['x-real-ip'];
      const ipdata = await ipDataService.clientIpData(realIP);
      adminLoginLog.ipAddress = realIP || req.ip || '::1';
      if (ipdata) {
        adminLoginLog.ipAddress = ipdata.ip;
        adminLoginLog.lat = ipdata.latitude;
        adminLoginLog.lng = ipdata.longitude;

        adminLoginLog.city = ipdata.city;
        adminLoginLog.region = ipdata.region;
        adminLoginLog.postalCode = ipdata.postal;
        adminLoginLog.asn = ipdata.asn.asn;
        adminLoginLog.asnName = ipdata.asn.name;
        adminLoginLog.asnDomain = ipdata.asn.domain;
        adminLoginLog.asnType = ipdata.asn.type;
        adminLoginLog.countryName = ipdata.country_name;
        adminLoginLog.CountryIso2 = ipdata.country_code;
      }

      adminLoginLog.adminAuthentication = req.body.user_authentication;
      adminLoginLog.device = req.body.device;

      const message: string = req.body.response_message;
      const accessRoleId = req.body.user_authentication.accessRole.id;
      const jwtPayLoad: Payload = {
        user_id: req.body.user_authentication.id,
        user_email: req.body.user_authentication.email,
        user_access_role_id: accessRoleId,
      };
      const previousLoginLog: AdminLoginLog|boolean = await adminLoginLogRepo
          .getLastLoginLogByAdminId(req.body.user_authentication.id);
      if (!previousLoginLog) {
        req.body.is_first_time_login = true;
      } else {
        req.body.is_first_time_login = false;
        // @ts-ignore
        req.body.previous_login_log_id = previousLoginLog.id;
      }
      const jwt: JWT = new JsonWebToken().generateAccessToken((jwtPayLoad));
      adminLoginLog.session = JSON.stringify(jwt);
      const createdAdminLoginLog: AdminLoginLog = await adminLoginLogRepo
          .save(adminLoginLog);
      if (!createdAdminLoginLog) {
        throw new Error();
      }
      if (message === loginSuccess) {
        req.body.admin_login_log = createdAdminLoginLog;
        next();
      } else {
        const response: LoginSuccesResponse =
        {
          message: message, jwt:
            new JsonWebToken().generateAccessToken(jwtPayLoad),
        };
        new ResponseService().sendSuccessResponse(res, response);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * find data for AdminLoginLog
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const adminLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'AdminLoginLog',
            AdminLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const adminLoginLogRepo: AdminLoginLogs =
        new AdminLoginLogs(adminLoginLogParameter);
      adminLoginLogRepo.initializeAssociations();
      let adminsLoginLogList: AdminLoginLog[] = await adminLoginLogRepo.find();
      if (adminsLoginLogList.length != 0) {
        res.setHeader('Content-Type', 'application/json');
        adminsLoginLogList = adminLoginLogRepo.toJson(adminsLoginLogList);
        new ResponseService().sendSuccessResponse(res, adminsLoginLogList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get UserLoginLog By Email
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const adminLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'AdminLoginLog',
            AdminLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const adminLoginLogRepo: AdminLoginLogs =
        new AdminLoginLogs(adminLoginLogParameter);
      adminLoginLogRepo.initializeAssociations();
      const email: string = req.params.email;
      let adminLoginLogs: AdminLoginLog[] =
        await adminLoginLogRepo.AdminLoginLogByEmail(email);
      if (adminLoginLogs.length >= 0) {
        res.setHeader('Content-Type', 'application/json');
        adminLoginLogs = adminLoginLogRepo.toJson(adminLoginLogs,
            ['session', 'admin_authentication']);
        new ResponseService().sendSuccessResponse(res, adminLoginLogs);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get LoginLog By Id
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public getLoginLogByAdminId = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const adminLoginLogParameter: RepositoryParameter =
          new RepositoryParameter(
              'AdminLoginLog',
              AdminLoginLog,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
      const adminLoginLogRepo: AdminLoginLogs =
          new AdminLoginLogs(adminLoginLogParameter);
      adminLoginLogRepo.initializeAssociations();
      const id: string = req.params.id;
      let adminLoginLogs: AdminLoginLog[] =
          await adminLoginLogRepo.getAdminLoginLogbyAdminId(id);
      if (adminLoginLogs.length >= 0) {
        res.setHeader('Content-Type', 'application/json');
        adminLoginLogs = adminLoginLogRepo.toJson(adminLoginLogs,
            ['session', 'admin_authentication']);
        new ResponseService().sendSuccessResponse(res, adminLoginLogs);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Admin Logout method
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public logout = async (
      req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const adminLoginLogParameter: RepositoryParameter =
        new RepositoryParameter(
            'AdminLoginLog',
            AdminLoginLog,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const adminLoginLogRepo: AdminLoginLogs =
        new AdminLoginLogs(adminLoginLogParameter);
      adminLoginLogRepo.initializeAssociations();
      const session: any = req.headers.session;
      let adminDetails: AdminLoginLogs[]|boolean =
        await adminLoginLogRepo.getOnCondition({_id: session});

      if (!adminDetails) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      const adminLoginLog: AdminLoginLog = new AdminLoginLog();
      adminLoginLog.expiry = new Date();

      adminDetails = await adminLoginLogRepo
          .patchEntity(adminDetails, adminLoginLog);
      const updateSessionExpirity: UpdateResult =
        await adminLoginLogRepo.updateAll(adminDetails, {_id: session});
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
