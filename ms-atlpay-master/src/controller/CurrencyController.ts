import {NextFunction, Request, Response} from 'express';
import {DeleteResult, getConnection, UpdateResult} from 'typeorm';
import {Currency} from '../model/entity/Currency';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Currencies} from '../model/repository/Currencies';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {
  httpDataNotFound, httpSuccessDataDelete,
  httpSuccessDataUpdate, ormDBName,
}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';

/**
  * CurrencyController
  * @class
  * @extends{AppController}
*/
export class CurrencyController extends AppController {
  /**
   * Database name
   * @var{any}
   */
  private _repositoryDBName: any;
  /**
   * Constructor of CurrencyController
   * @param{string} name
   */
  constructor(name: string) {
    super(name);
    this._repositoryDBName = ormDBName;
  }
  /**
    * Find all currency List
    * @param{Request} req - Request
    * @param{Response} res - Response
    * @param{NextFunction} next - next function
  */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const currencyParameter: RepositoryParameter = new RepositoryParameter(
          'currency',
          Currency,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const currencyRepo: Currencies = new Currencies(currencyParameter);
      currencyRepo.initializeAssociations();
      let currencyList: Currency[] = await currencyRepo.find();
      if (currencyList.length != 0) {
        currencyList = currencyRepo.toJson(currencyList);
        new ResponseService().sendSuccessResponse(res, currencyList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
    * Find one currency List
    * @param{Request} req - Request
    * @param{Response} res - Response
    * @param{NextFunction} next - next function
  */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const currencyParameter: RepositoryParameter = new RepositoryParameter(
          'currency',
          Currency,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const iso: string = req.params.iso;
      const currencyRepo: Currencies = new Currencies(currencyParameter);
      currencyRepo.initializeAssociations();
      let currency: Currency[] = await currencyRepo.get(iso);
      if (currency && currency.length != 0) {
        currency = currencyRepo.toJson(currency);
        new ResponseService().sendSuccessResponse(res, currency);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
    * Update currency List
    * @param{Request} req - Request
    * @param{Response} res - Response
    * @param{NextFunction} next - next function
  */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const currencyParameter: RepositoryParameter = new RepositoryParameter(
          'currency',
          Currency,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const iso: string = req.params.iso;
      if (req.body.iso && (iso !== req.body.iso)) {
        throw new InvalidInputException('Invalid ISO');
      }
      const currencyRepo: Currencies = new Currencies(currencyParameter);
      currencyRepo.initializeAssociations();
      let currency: any = await currencyRepo.getOnCondition({_iso: iso});
      const currencyUpdate = new Currency();
      if (req.body.iso) {
        currencyUpdate.iso = req.body.iso;
      } if (req.body.iso_numeric) {
        currencyUpdate.isoNumeric = req.body.iso_numeric;
      } if (req.body.common_name) {
        currencyUpdate.commonName = req.body.common_name;
      } if (req.body.official_name) {
        currencyUpdate.officialName = req.body.official_name;
      } if (req.body.icon) {
        currencyUpdate.icon = req.body.icon;
      }
      currency = currencyRepo.
          patchEntity(currency, currencyUpdate);

      const updateCurrencyResult: UpdateResult = await currencyRepo.
          updateAll(currency, {_iso: iso});
      const noOfRowsAffected: number | any = updateCurrencyResult.affected;
      if (noOfRowsAffected != 0) {
        new ResponseService()
            .sendSuccessResponse(res, httpSuccessDataUpdate);
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        next(dataNotFoundException);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
    * Delete currency
    * @param{Request} req - Request
    * @param{Response} res - Response
    * @param{NextFunction} next - next function
  */
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const currencyParameter: RepositoryParameter = new RepositoryParameter(
          'currency',
          Currency,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const iso: string = req.params.iso;
      const currencyRepo: Currencies = new Currencies(currencyParameter);
      currencyRepo.initializeAssociations();
      const deletedCurrencyResult: DeleteResult = await currencyRepo.
          deleteAll({_iso: iso});
      const noOfRowsAffected: number | any = deletedCurrencyResult.affected;
      if (noOfRowsAffected != 0) {
        new ResponseService()
            .sendSuccessResponse(res, httpSuccessDataDelete);
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        throw dataNotFoundException;
      }
    } catch (err: any) {
      next(err);
    }
  };
}
