import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {Honorofic} from '../model/entity/Honorofic';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {Honorofics} from '../model/repository/Honorofics';

/**
 * HonoroficController
 * @class
 * @extends{AppController}
 */
export class HonoroficController extends AppController {
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
    super('HonoroficController');
    this._dataBaseName = ormDBName;
  }

  /**
   * find data for Honorofic
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const honoroficParameter: RepositoryParameter =
        new RepositoryParameter(
            'Honorofic',
            Honorofic,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const honoroficRepo: Honorofics =
        new Honorofics(honoroficParameter);
      honoroficRepo.initializeAssociations();

      let honoroficList: Honorofic[] = await honoroficRepo.sortByDisplayOrder();
      if (honoroficList && honoroficList.length != 0) {
        honoroficList = honoroficRepo.toJson(honoroficList);
        new ResponseService().sendSuccessResponse(res, honoroficList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for Honorofic
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const honoroficParameter: RepositoryParameter =
        new RepositoryParameter(
            'Honorofic',
            Honorofic,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const honoroficRepo: Honorofics =
        new Honorofics(honoroficParameter);
      honoroficRepo.initializeAssociations();

      const code: string = req.params.code;
      let honoroficDetails: Honorofic[] =
        await honoroficRepo.getOnCondition({_code: code});
      if (honoroficDetails && honoroficDetails.length != 0) {
        honoroficDetails = honoroficRepo.toJson(honoroficDetails);
        new ResponseService().sendSuccessResponse(res, honoroficDetails);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
