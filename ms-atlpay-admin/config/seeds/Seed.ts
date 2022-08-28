import {DBService} from './../../src/service/DBService';
import {BusinessLegalEntityTypesSeed} from './BusinessLegalEntityTypesSeed';
import {BusinessSectorsSeed} from './BusinessSectorsSeed';
import {BusinessRoleSeed} from './BusinessRoleSeed';
import {CivilStatusSeed} from './CivilStatusSeed';
import {DocumentRejectReasonSeed} from '../seeds/DocumentRejectReasonSeed';
import {ComplianceDocumentCategorySeed}
  from '../seeds/ComplianceDocumentCategorySeed';
import {HonoroficSeed} from '../seeds/HonoroficSeed';
import {PaymentInstrumentSeed} from './PaymentInstrumentSeed';

/**
 * Seed method
 * @class
 */
class Seed {
  /**
   * Run seed method.
   * @static
   */
  static run() {
    new BusinessLegalEntityTypesSeed().run();
    new BusinessSectorsSeed().run();
    new BusinessRoleSeed().run();
    new CivilStatusSeed().run();
    new DocumentRejectReasonSeed().run();
    new ComplianceDocumentCategorySeed().run();
    new HonoroficSeed().run();
    new PaymentInstrumentSeed().run();
  }
}
new DBService().connect().then(()=>{
  Seed.run();
}).catch((error)=>{
  console.log(error);
});

