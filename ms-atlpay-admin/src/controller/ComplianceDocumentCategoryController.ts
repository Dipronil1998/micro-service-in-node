import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {ComplianceDocumentCategory}
  from '../model/entity/ComplianceDocumentCategory';
import {ComplianceDocumentCategories}
  from '../model/repository/ComplianceDocumentCategories';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {DataNotFoundException} from '../exception/DataNotFoundException';

/**
 * ComplianceDocumentCategoryController
 * @class
 * @extends{AppController}
 */
export class ComplianceDocumentCategoryController extends AppController {
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
    super('ComplianceDocumentCategoryController');
    this._dataBaseName = ormDBName;
  }

  /**
   * find data for ComplianceDocumentCategory
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const complianceDocumentCategoryParameter: RepositoryParameter =
        new RepositoryParameter(
            'ComplianceDocumentCategory',
            ComplianceDocumentCategory,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const complianceDocumentCategoryRepo: ComplianceDocumentCategories =
        new ComplianceDocumentCategories(complianceDocumentCategoryParameter);
      complianceDocumentCategoryRepo.initializeAssociations();

      let complianceDocumentCategoryList: ComplianceDocumentCategory[] =
        await complianceDocumentCategoryRepo.sortByDisplayOrder();
      if (complianceDocumentCategoryList &&
          complianceDocumentCategoryList.length != 0) {
        complianceDocumentCategoryList =
          complianceDocumentCategoryRepo
              .toJson(complianceDocumentCategoryList);
        new ResponseService()
            .sendSuccessResponse(res, complianceDocumentCategoryList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for ComplianceDocumentCategory
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const complianceDocumentCategoryParameter: RepositoryParameter =
        new RepositoryParameter(
            'ComplianceDocumentCategory',
            ComplianceDocumentCategory,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const complianceDocumentCategoryRepo: ComplianceDocumentCategories =
        new ComplianceDocumentCategories(complianceDocumentCategoryParameter);
      complianceDocumentCategoryRepo.initializeAssociations();

      const code: string = req.params.code;
      let complianceDocumentCategoryDetails: ComplianceDocumentCategory[] =
        await complianceDocumentCategoryRepo
            .getOnCondition({_code: code});
      if (complianceDocumentCategoryDetails &&
        complianceDocumentCategoryDetails.length != 0) {
        complianceDocumentCategoryDetails =
          complianceDocumentCategoryRepo
              .toJson(complianceDocumentCategoryDetails);
        new ResponseService()
            .sendSuccessResponse(res, complianceDocumentCategoryDetails);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
