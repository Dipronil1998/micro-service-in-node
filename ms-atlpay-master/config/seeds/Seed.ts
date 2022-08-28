import {CurrenciesSeed} from './CurrenciesSeed';
import {CountriesSeed} from './CountriesSeed';
import {DBService} from './../../src/service/DBService';
import {ContinentsSeed} from './ContinentsSeed';
import {LanguagesSeed} from './LanguagesSeed';
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
    new CurrenciesSeed().run();
    new CountriesSeed().run();
    new ContinentsSeed().run();
    new LanguagesSeed().run();
  }
}
new DBService().connect().then(()=>{
  Seed.run();
}).catch((error)=>{
  console.log(error);
});


