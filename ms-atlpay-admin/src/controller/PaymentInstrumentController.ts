import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound,
  httpSuccessDataAdded,
  httpSuccessDataUpdate,
  ormDBName} from '../../config/bootstrap';
import {PaymentInstrument} from '../model/entity/PaymentInstrument';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {PaymentInstruments} from '../model/repository/PaymentMethodCharges';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
import {InvalidInputException} from '../exception/InvalidInputException';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InstrumentCharge} from '../model/entity/InstrumentCharge';
/**
 * Payment Method Charge Controller
 * @class{PaymentMethodChargeController}
 * @extend{AppController}
 */
export class PaymentInstrumentController extends AppController {
  /**
    * Database name
    * @var{string}
    */
  private _dataBaseName: string;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    super('PaymentMethodChargeController');
    this._dataBaseName = ormDBName;
  }
  /**
   * Add a Payment Method or Instrument
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public create = async (request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      const paymentInstumentParameter: RepositoryParameter = new
      RepositoryParameter('PaymentMethodCharge',
          PaymentInstrument,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName));
      const paymentInstrumentRepo: PaymentInstruments =
        new PaymentInstruments(paymentInstumentParameter);
      const newPaymentMethodChargeEntity = paymentInstrumentRepo.newEntity();
      const title: string = request.body.title;
      const description: string = request.body.description;
      const isLeaf: boolean = request.body.is_leaf;
      const parentId: string = request.body.parent_id;
      newPaymentMethodChargeEntity.title = title;
      newPaymentMethodChargeEntity.description = description;
      newPaymentMethodChargeEntity.isLeaf = isLeaf;
      const parentEntity : PaymentInstrument =
        await paymentInstrumentRepo.getOnCondition({_id: parentId});
      if (!parentEntity) {
        throw new DataNotFoundException(httpDataNotFound);
      }

      if (isLeaf) {
        const instrmentChargeId: string = request.body.insturment_charge_id;
        if (!instrmentChargeId) {
          throw new InvalidInputException('Invalid Instrument Charge');
        }

        const instrumentCharge: InstrumentCharge| boolean =
          await paymentInstrumentRepo.getInsturmentCharge(instrmentChargeId);
        if (instrumentCharge instanceof InstrumentCharge) {
          newPaymentMethodChargeEntity.instrumentCharge = instrumentCharge;
        } else {
          throw new InvalidInputException('Invalid Instrument Charge');
        }
      } else {
        newPaymentMethodChargeEntity.parent = parentEntity;
      }
      const savedEntity =
        await paymentInstrumentRepo
            .save(newPaymentMethodChargeEntity);

      if (savedEntity) {
        paymentInstrumentRepo.calculate();
        new ResponseService()
            .sendSuccessResponse(response, httpSuccessDataAdded);
      } else {
        throw new InvalidInputException('Invalid Input');
      }
    } catch (error: any) {
      next(error);
    }
  };
  /**
   * Update a Payment Method or Instrument
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public update = async (request: Request,
      response: Response,
      next: NextFunction)=>{
    try {
      const paymentInstumentParameter: RepositoryParameter = new
      RepositoryParameter('Payment Instrument',
          PaymentInstrument,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName));
      const paymentInstrumentRepo: PaymentInstruments =
      new PaymentInstruments(paymentInstumentParameter);
      const paymentMethodChargeId : string = request.params.id;
      const paymentMethodCharge : PaymentInstrument =
      await paymentInstrumentRepo.get(paymentMethodChargeId);
      if (paymentMethodCharge instanceof PaymentInstrument) {
        const title: string = request.body.title;
        const description: string = request.body.description;
        const isLeaf: boolean = request.body.is_leaf;
        const parentId: string = request.body.parent_id;
        if (title) {
          paymentMethodCharge.title = title;
        }
        if (description) {
          paymentMethodCharge.description = description;
        }
        if (parentId) {
          const parentEntity : PaymentInstrument =
          await paymentInstrumentRepo.getOnCondition({_id: parentId});
          if (!parentEntity) {
            throw new DataNotFoundException(httpDataNotFound);
          }
          paymentMethodCharge.parent = parentEntity;
        }

        if (typeof request.body.is_leaf !== 'undefined') {
          if (! isLeaf) {
            paymentMethodCharge.isLeaf = isLeaf;
            // @ts-ignore
            paymentMethodCharge.instrumentCharge = null;
          } else {
            if (!paymentMethodCharge.isLeaf) {
              paymentMethodCharge.isLeaf = isLeaf;
              const instrmentChargeId : string =
                request.body.insturment_charge_id;
              const instrumentCharge: InstrumentCharge| boolean =
            await paymentInstrumentRepo
                .getInsturmentCharge(instrmentChargeId);

              if (instrumentCharge instanceof InstrumentCharge) {
                paymentMethodCharge.instrumentCharge = instrumentCharge;
              } else {
                throw new InvalidInputException('Invaild Instrument Charge');
              }
            }
          }
        } else if (typeof request.body.is_leaf === 'undefined' &&
       request.body.insturment_charge_id) {
          const instrmentChargeId : string =
                request.body.insturment_charge_id;
          const instrumentCharge: InstrumentCharge| boolean =
            await paymentInstrumentRepo
                .getInsturmentCharge(instrmentChargeId);

          if (instrumentCharge instanceof InstrumentCharge) {
            paymentMethodCharge.instrumentCharge = instrumentCharge;
          } else {
            throw new InvalidInputException('Invaild Instrument Charge');
          }
        }


        const savedEntity =
          await paymentInstrumentRepo
              .save(paymentMethodCharge);
        if (savedEntity) {
          paymentInstrumentRepo.calculate();
          new ResponseService()
              .sendSuccessResponse(response, httpSuccessDataUpdate);
        } else {
          throw new InvalidInputException('Invalid Input');
        }
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get all Payment Method or Instrument
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (request: Request,
      response: Response,
      next: NextFunction)=>{
    try {
      const paymentInstrumentParameter: RepositoryParameter = new
      RepositoryParameter('PaymentMethodCharge',
          PaymentInstrument,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName));
      const paymentInstrumentRepo: PaymentInstruments =
          new PaymentInstruments(paymentInstrumentParameter);
      const paymentMethodChargeList : Array<PaymentInstrument> = await
      paymentInstrumentRepo.find();
      if (paymentMethodChargeList.length===0) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      new ResponseService().sendSuccessResponse(
          response,
          {data: paymentInstrumentRepo
              .toJson(paymentMethodChargeList)});
    } catch (error: any) {
      next(error);
    }
  };
}
