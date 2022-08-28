import {CurrencyController} from '../controller/CurrencyController';
import {CurrencyValidator} from '../validation/CurrencyValidator';
import {AppRoute} from './AppRoute';
/**
 * Currency Route Class
 * @class
*/
export class CurrencyRoute extends AppRoute {
  /**
   * Initializes a new instance
   * @param{string} path
  */
  constructor(path: string) {
    /**
     * @param path
    */
    super(path);
    this.initializeRoutes();
  }
  /**
   * router methods
  */
  private initializeRoutes() {
    this._router.get(this._path,
        new CurrencyController('currency').find);
    this._router.get(this._path + '/:iso',
        new CurrencyValidator('currency validator').paramValidateChain,
        new CurrencyValidator('currency validator').validationErrorHandle,
        new CurrencyController('currency').get);
    this._router.delete(this._path+'/:iso',
        new CurrencyController('currency').delete);
    this._router.put(this._path+'/:iso',
        new CurrencyValidator('currency validator').updateValidateChain,
        new CurrencyValidator('currency validator').validationErrorHandle,
        new CurrencyController('currency').update);
  }
}
