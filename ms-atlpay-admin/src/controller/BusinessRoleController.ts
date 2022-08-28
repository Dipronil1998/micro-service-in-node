import {AppController} from './AppController';
import {NextFunction, Request, Response} from 'express';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {BusinessRole} from '../model/entity/BusinessRole';
import {getConnection} from 'typeorm';
import {BusinessRoles} from '../model/repository/BusinessRoles';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
/**
 * BusinessRoleController
 * @class
 * @extends{AppController}
 */
export class BusinessRoleController extends AppController {
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
    super('BusinessRoleController');
    this._dataBaseName = ormDBName;
  }

  /**
   * Find Data For BusinessRole
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const BusinessRoleParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessRole',
            BusinessRole,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessRoleRepo: BusinessRoles =
        new BusinessRoles(BusinessRoleParameter);
      businessRoleRepo.initializeAssociations();
      let businessRoleList: BusinessRole[] =
        await businessRoleRepo.sortByDisplayOrder();
      if (businessRoleList && businessRoleList.length != 0) {
        businessRoleList = businessRoleRepo.toJson(businessRoleList);
        new ResponseService().sendSuccessResponse(res, businessRoleList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /** 0
   * Get Data For BusinessRole
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const BusinessRoleParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessRole',
            BusinessRole,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessRoleRepo: BusinessRoles =
        new BusinessRoles(BusinessRoleParameter);
      businessRoleRepo.initializeAssociations();
      const code: string = req.params.code;
      let businessRole: BusinessRole[] =
        await businessRoleRepo.getOnCondition({_code: code});
      if (businessRole) {
        businessRole = businessRoleRepo.toJson(businessRole);
        new ResponseService().sendSuccessResponse(res, businessRole);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
