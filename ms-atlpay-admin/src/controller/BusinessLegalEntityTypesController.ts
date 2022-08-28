import {AppController} from './AppController';
import {NextFunction, Request, Response} from 'express';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {BusinessLegalEntityType} from '../model/entity/BusinessLegalEntityType';
import {getConnection} from 'typeorm';
import {BusinessLegalEntityTypes} from
  '../model/repository/BusinessLegalEntityTypes';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
/**
 * BusinessLegalEntityTypesController
 * @class
 * @extends{AppController}
 */
export class BusinessLegalEntityTypesController extends AppController {
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
   * Find Data For BusinessLegalEntityType
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
            'BusinessLegalEntityType',
            BusinessLegalEntityType,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessLegalEntityTypeRepo: BusinessLegalEntityTypes =
        new BusinessLegalEntityTypes(BusinessRoleParameter);
      businessLegalEntityTypeRepo.initializeAssociations();
      let businessLegalEntityTypeList: BusinessLegalEntityType[] =
        await businessLegalEntityTypeRepo.sortByDisplayOrder();
      if (businessLegalEntityTypeList &&
          businessLegalEntityTypeList.length != 0) {
        businessLegalEntityTypeList = businessLegalEntityTypeRepo
            .toJson(businessLegalEntityTypeList);
        new ResponseService()
            .sendSuccessResponse(res, businessLegalEntityTypeList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for BusinessLegalEntityType
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
            'BusinessLegalEntityType',
            BusinessLegalEntityType,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessLegalEntityTypeRepo: BusinessLegalEntityTypes =
        new BusinessLegalEntityTypes(BusinessRoleParameter);
      businessLegalEntityTypeRepo.initializeAssociations();
      const code: string = req.params.code;
      let businessLegalEntityType: BusinessLegalEntityType[] =
        await businessLegalEntityTypeRepo.getOnCondition({_code: code});
      if (businessLegalEntityType) {
        businessLegalEntityType = businessLegalEntityTypeRepo
            .toJson(businessLegalEntityType);
        new ResponseService().sendSuccessResponse(res, businessLegalEntityType);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
