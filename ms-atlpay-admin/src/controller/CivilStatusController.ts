import {AppController} from './AppController';
import {NextFunction, Request, Response} from 'express';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {CivilStatus} from '../model/entity/CivilStatus';
import {getConnection} from 'typeorm';
import {CivilStatuses} from '../model/repository/CivilStatuses';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
/**
 * CivilStatusController
 * @class
 * @extends{AppController}
 */
export class CivilStatusController extends AppController {
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
    super('CivilStatusController');
    this._dataBaseName = ormDBName;
  }

  /**
   * Find Data For CivilStatus
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const CivilStatusParameter: RepositoryParameter =
        new RepositoryParameter(
            'CivilStatus',
            CivilStatus,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const civilStatusesRepo: CivilStatuses =
        new CivilStatuses(CivilStatusParameter);
      civilStatusesRepo.initializeAssociations();
      let civilStatusesList: CivilStatus[] =
        await civilStatusesRepo.sortByDisplayOrder();
      if (civilStatusesList && civilStatusesList.length != 0) {
        civilStatusesList = civilStatusesRepo.toJson(civilStatusesList);
        new ResponseService().sendSuccessResponse(res, civilStatusesList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Get Data For CivilStatus
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const CivilStatusParameter: RepositoryParameter =
        new RepositoryParameter(
            'CivilStatus',
            CivilStatus,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const civilStatusesRepo: CivilStatuses =
        new CivilStatuses(CivilStatusParameter);
      civilStatusesRepo.initializeAssociations();
      const code: string = req.params.code;
      let civilStatus: CivilStatus[] =
        await civilStatusesRepo.getOnCondition({_code: code});
      if (civilStatus) {
        civilStatus = civilStatusesRepo.toJson(civilStatus);
        new ResponseService().sendSuccessResponse(res, civilStatus);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
