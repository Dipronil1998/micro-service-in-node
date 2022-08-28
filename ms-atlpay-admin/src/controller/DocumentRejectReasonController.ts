import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound, ormDBName} from '../../config/bootstrap';
import {DocumentRejectReason} from '../model/entity/DocumentRejectReason';
import {DocumentRejectReasons} from '../model/repository/DocumentRejectReasons';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {DataNotFoundException} from '../exception/DataNotFoundException';

/**
 * DocumentRejectReasonController
 * @class
 * @extends{AppController}
 */
export class DocumentRejectReasonController extends AppController {
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
    super('DocumentRejectReasonController');
    this._dataBaseName = ormDBName;
  }

  /**
   * find data for DocumentRejectReason
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const documentRejectReasonParameter: RepositoryParameter =
        new RepositoryParameter(
            'DocumentRejectReason',
            DocumentRejectReason,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const documentRejectReasonRepo: DocumentRejectReasons =
        new DocumentRejectReasons(documentRejectReasonParameter);
      documentRejectReasonRepo.initializeAssociations();

      let documentRejectReasonList: DocumentRejectReason[] =
        await documentRejectReasonRepo.sortByDisplayOrder();
      if (documentRejectReasonList &&
          documentRejectReasonList.length != 0) {
        documentRejectReasonList =
          documentRejectReasonRepo.toJson(documentRejectReasonList);
        new ResponseService()
            .sendSuccessResponse(res, documentRejectReasonList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * get data for DocumentRejectReason
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const documentRejectReasonParameter: RepositoryParameter =
        new RepositoryParameter(
            'DocumentRejectReason',
            DocumentRejectReason,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const documentRejectReasonRepo: DocumentRejectReasons =
        new DocumentRejectReasons(documentRejectReasonParameter);
      documentRejectReasonRepo.initializeAssociations();

      const id: string = req.params.id;
      let documentRejectReasonDetails: DocumentRejectReason[] =
        await documentRejectReasonRepo
            .getOnCondition({_id: id});
      if (documentRejectReasonDetails &&
        documentRejectReasonDetails.length != 0) {
        documentRejectReasonDetails =
          documentRejectReasonRepo.toJson(documentRejectReasonDetails);
        new ResponseService()
            .sendSuccessResponse(res, documentRejectReasonDetails);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
