import {ormDBName} from '../bootstrap';
import {RepositoryParameter}
  from '../../src/model/repository/AppRepository';
import {getConnection} from 'typeorm';
import {PaymentInstrument} from
  '../../src/model/entity/PaymentInstrument';
import {PaymentInstruments} from
  '../../src/model/repository/PaymentMethodCharges';
/**
 * Payment Method seed
 */
export class PaymentInstrumentSeed {
  /**
   * Run Method.
   * Write your database seeder using this method.
   * @return{void}
   */
  public async run() {
    try {
      const dbName: string = ormDBName;
      const paymentMethodChargeParameter : RepositoryParameter = new
      RepositoryParameter('PaymentMethodCharge',
          PaymentInstrument,
          dbName,
          'none',
          getConnection(dbName));
      const paymentMethodChargeRepo : PaymentInstruments =
        new PaymentInstruments(paymentMethodChargeParameter);
      const newPaymentMethodChargeEntity : PaymentInstrument =
        paymentMethodChargeRepo.newEntity();
      newPaymentMethodChargeEntity.title = 'Root';
      newPaymentMethodChargeEntity.description = 'Root Node';
      newPaymentMethodChargeEntity.isLeaf = false;
      const isExist = await paymentMethodChargeRepo
          .getOnCondition({_title: 'Root'});
      if (! isExist) {
        await paymentMethodChargeRepo
            .save(newPaymentMethodChargeEntity);
        await paymentMethodChargeRepo.calculate();
      }
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
    }
  }
}
