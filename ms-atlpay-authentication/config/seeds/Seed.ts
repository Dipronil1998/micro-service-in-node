import {DBService} from './../../src/service/DBService';
import {PlatformsSeed} from './PlatformsSeed';
import {AccessRoleSeed} from './AccessRoleSeed';
import {AdminAuthenticationSeed} from './AdminAuthenticationSeed';
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
    new AccessRoleSeed().run();
    new PlatformsSeed().run();
    // new UsersAuthenticationSeed().run();
    new AdminAuthenticationSeed().run();
  }
}
new DBService().connect().then(()=>{
  Seed.run();
}).catch((error)=>{
  console.log(error);
});


