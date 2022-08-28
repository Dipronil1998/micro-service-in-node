import {DBService} from './../../src/service/DBService';

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
    // code will write here
  }
}
new DBService().connect()
    .then(()=>{
      Seed.run();
    }).catch((error)=>{
      console.log(error);
    });


