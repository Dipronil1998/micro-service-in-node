import {DBService} from './../../src/service/DBService';
import {MerchantsSeed} from './MerchantsSeed';
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
    new MerchantsSeed().run();
  }
}
new DBService().connect().then(()=>{
  Seed.run();
}).catch((error)=>{
  console.log(error);
});


