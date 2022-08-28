import {MerchantBusinessProfileController}
  from '../controller/MerchantBusinessProfileController';
import {MerchantBusinessProfileValidation}
  from '../validation/MerchantBusinessProfileValidation';
import {AppRoute} from './AppRoute';
/**
 * Merchant Business Profile Route
 * @class{MerchantBusinessProfileRoute}
 */
export class MerchantBusinessProfileRoute extends AppRoute {
  /**
   * Contructor Method.
   * @param{string} path
   */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
   * Initialize Route
   */
  private initializeRoutes() {
    this._router.get(this._path, new MerchantBusinessProfileController()
        .find);
    this._router.get(this._path+'/:id',
        new MerchantBusinessProfileController().get);
    this._router.put(this._path+'/:id',
        new MerchantBusinessProfileValidation(
            'MerchantBusinessProfileValidation')
            .updateValidationChain,
        new MerchantBusinessProfileValidation(
            'MerchantBusinessProfileValidation')
            .validationErrorHandle,
        new MerchantBusinessProfileController()
            .update);
  }
}
