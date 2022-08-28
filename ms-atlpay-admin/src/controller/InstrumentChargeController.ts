import {NextFunction, Request, Response} from 'express';
import {getConnection, UpdateResult} from 'typeorm';
import {
  httpDataNotFound,
  httpSuccessDataAdded,
  httpSuccessDataUpdate,
  invalidInputMessage,
  ormDBName,
} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {InstrumentCharge} from '../model/entity/InstrumentCharge';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {InstrumentCharges} from '../model/repository/InstrumentCharges';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';

/**
 * Instrument Charge Controller
 * @class
 * @extends{AppController}
 */
export class InstrumentChargeController extends AppController {
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
    super('InstrumentChargeController');
    this._dataBaseName = ormDBName;
  }

  /**
     * create method
     * @param{Request} req
     * @param{Response} res
     * @param{NextFunction} next
     */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const InstrumentChargeParameter: RepositoryParameter =
        new RepositoryParameter(
            'InstrumentCharge',
            InstrumentCharge,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const instrumentChargeRepo: InstrumentCharges =
        new InstrumentCharges(InstrumentChargeParameter);
      instrumentChargeRepo.initializeAssociations();
      const createInstrumentCharge: InstrumentCharge =
        instrumentChargeRepo.newEntity();
      const amount: number = req.body.amount;
      const flatFees: number = req.body.flat_fees;
      const percentFees: number = req.body.percent_fees;
      const minFees: number = req.body.min_fees;
      const maxFees: number = req.body.max_fees;

      if (amount) {
        createInstrumentCharge.amount = amount;
      } if (flatFees) {
        createInstrumentCharge.flatFees = flatFees;
      } if (percentFees) {
        createInstrumentCharge.percentFees = percentFees;
      } if (minFees) {
        createInstrumentCharge.minFees = minFees;
      } if (maxFees) {
        createInstrumentCharge.maxFees = maxFees;
      }
      const createInstrument: InstrumentCharge | boolean =
        await instrumentChargeRepo.save(createInstrumentCharge);
      if (createInstrument) {
        new ResponseService().sendSuccessResponse(res, httpSuccessDataAdded);
      } else {
        throw new InvalidInputException('Invalid Input');
      }
    } catch (err: any) {
      next(err);
    }
  };
  /**
   * Update Instrument charge Controller
   * @param{Request} req
   * @param{Response} res
   * @param{NextFunction} next
   */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const InstrumentChargeParameter: RepositoryParameter =
        new RepositoryParameter(
            'InstrumentCharge',
            InstrumentCharge,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const instrumentChargeRepo: InstrumentCharges =
        new InstrumentCharges(InstrumentChargeParameter);
      instrumentChargeRepo.initializeAssociations();
      const instrumentChargeId = req.params.id;
      let instrumentCharge: InstrumentCharge =
        await instrumentChargeRepo.getOnCondition({_id: instrumentChargeId});
      const updateInstrumentCharge: InstrumentCharge = new InstrumentCharge();
      if (instrumentCharge instanceof InstrumentCharge) {
        const amount: number = req.body.amount;
        const flatFees: number = req.body.flat_fees;
        const percentFees: number = req.body.percent_fees;
        const minFees: number = req.body.min_fees;
        const maxFees: number = req.body.max_fees;
        if (amount) {
          updateInstrumentCharge.amount = amount;
        }
        if (flatFees) {
          updateInstrumentCharge.flatFees = flatFees;
        }
        if (percentFees) {
          updateInstrumentCharge.percentFees = percentFees;
        }
        if (minFees) {
          updateInstrumentCharge.minFees = minFees;
        }
        if (maxFees) {
          updateInstrumentCharge.maxFees = maxFees;
        }

        instrumentCharge = await instrumentChargeRepo
            .patchEntity(instrumentCharge, updateInstrumentCharge);
        const updateauthenticationResult: UpdateResult =
          await instrumentChargeRepo
              .updateAll(instrumentCharge, {_id: instrumentChargeId});
        const noOfRowsAffected: number | undefined =
          updateauthenticationResult.affected;
        if (noOfRowsAffected) {
          new ResponseService()
              .sendSuccessResponse(res, httpSuccessDataUpdate);
        } else {
          throw new InvalidInputException(invalidInputMessage);
        }
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };
  /**
   * Get all Instrument Charge
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      const InstrumentChargeParameter: RepositoryParameter =
        new RepositoryParameter(
            'InstrumentCharge',
            InstrumentCharge,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const instrumentChargeRepo: InstrumentCharges =
        new InstrumentCharges(InstrumentChargeParameter);
      instrumentChargeRepo.initializeAssociations();
      const instrumentCharges: Array<InstrumentCharge> =
        await instrumentChargeRepo.find();

      if (instrumentCharges && instrumentCharges.length > 0) {
        const instrumentChargeDetail: InstrumentCharge[] =
          instrumentChargeRepo.toJson(instrumentCharges);
        new ResponseService()
            .sendSuccessResponse(response, instrumentChargeDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error) {
      next(error);
    }
  };
}
