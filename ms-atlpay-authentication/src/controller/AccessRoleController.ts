import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {AccessRole} from '../model/entity/AccessRole';
import {AccessRoles} from '../model/repository/AccessRoles';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
/**
 * Accessrole controller
 * @class{AccessRoleController}
 * @extends{AppController}
 */
export class AccessRoleController extends AppController {
  private _dataBaseName : string;
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('Access Role Controller');
    this._dataBaseName = ormDBName;
  }
  /**
   * Get all AccessRole
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (request: Request,
      response : Response,
      next: NextFunction)=>{
    try {
      const rolesRepositoryOptions : RepositoryParameter =
        new RepositoryParameter('role',
            AccessRole,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));
      const accessRoleRepo : AccessRoles =
        new AccessRoles(rolesRepositoryOptions);
      let accessRoles: AccessRole[] = await accessRoleRepo.find();
      if (accessRoles && accessRoles.length!=0) {
        accessRoles = accessRoleRepo.toJson(accessRoles);
        new ResponseService().sendSuccessResponse(response, accessRoles );
      } else {
        const dataNotFound : DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        throw dataNotFound;
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get All The Merchant Information
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getMerchant = async (request: Request,
      response : Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const rolesRepositoryOptions : RepositoryParameter =
      new RepositoryParameter('role',
          AccessRole,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName));
      const accessRoleRepo : AccessRoles =
        new AccessRoles(rolesRepositoryOptions);
      let merchantRole = await accessRoleRepo.getMerchant();
      if (merchantRole.length != 0) {
        merchantRole = accessRoleRepo.toJson(merchantRole);
        new ResponseService().sendSuccessResponse(response, merchantRole );
      } else {
        const dataNotFound : DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        throw dataNotFound;
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get All The Super Admin and Admin Information
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getAdmin = async (request: Request,
      response : Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const rolesRepositoryOptions : RepositoryParameter =
      new RepositoryParameter('role',
          AccessRole,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName));
      const accessRoleRepo : AccessRoles =
        new AccessRoles(rolesRepositoryOptions);
      let adminRole = await accessRoleRepo.getAdmin();
      if (adminRole.length != 0) {
        adminRole = accessRoleRepo.toJson(adminRole);
        new ResponseService().sendSuccessResponse(response, adminRole );
      } else {
        const dataNotFound : DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        throw dataNotFound;
      }
    } catch (error: any) {
      next(error);
    }
  };
}
