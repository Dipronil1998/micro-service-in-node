import {AppController} from './AppController';
import {NextFunction, Request, Response} from 'express';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {BusinessSector} from '../model/entity/BusinessSector';
import {getConnection} from 'typeorm';
import {BusinessSectors} from '../model/repository/BusinessSectors';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
/**
 * BusinessSectorsController
 * @class
 * @extends{AppController}
 */
export class BusinessSectorsController extends AppController {
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
    super('BusinessSectorsController');
    this._dataBaseName = ormDBName;
  }

  /**
   * Find Data For BusinessSector
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const BusinessSectorParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessSector',
            BusinessSector,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const page: any = req.query.page;
      const size: any = req.query.size;
      const businessSectorRepo: BusinessSectors =
        new BusinessSectors(BusinessSectorParameter);
      businessSectorRepo.initializeAssociations();
      let businessSectorList: BusinessSector[] =
        await businessSectorRepo.pagination(page, size);
      // console.log(await businessSectorRepo.pagination(page, size));
      // console.log(await businessSectorRepo.find())
      if (businessSectorList && businessSectorList.length != 0) {
        businessSectorList = businessSectorRepo.toJson(businessSectorList);
        // const paginatedBusinessSectorList =
        //   new Pagination().pagination(businessSectorList, page, size);
        new ResponseService()
            .sendSuccessResponse(res, businessSectorList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Get Data For BusinessSector
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const BusinessSectorParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessSector',
            BusinessSector,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessSectorRepo: BusinessSectors =
        new BusinessSectors(BusinessSectorParameter);
      businessSectorRepo.initializeAssociations();
      const code: string = req.params.code;
      let businessSector: BusinessSector[] =
        await businessSectorRepo.getOnCondition({_code: code});
      if (businessSector) {
        businessSector = businessSectorRepo.toJson(businessSector);
        new ResponseService().sendSuccessResponse(res, businessSector);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
