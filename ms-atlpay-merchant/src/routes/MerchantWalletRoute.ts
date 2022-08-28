import {MerchantWalletController}
  from '../controller/MerchantWalletController';
import {MerchantWalletValidation} from '../validation/MerchantWalletValidation';
import {AppRoute} from './AppRoute';
/**
 * Merchant Wallet Route
 * @class{MerchantWalletRoute}
 */
export class MerchantWalletRoute extends AppRoute {
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
    this._router.get(this._path, new MerchantWalletController().find);
    this._router.get(this._path + '/:id',
        new MerchantWalletController().get);
    this._router.post(this._path,
        new MerchantWalletValidation('Merchant Wallet Validation')
            .validationChain,
        new MerchantWalletValidation('Merchant Wallet Validation')
            .validationErrorHandle,
        new MerchantWalletController().create);
    this._router.put(this._path + '/:id',
        new MerchantWalletValidation('Merchant Wallet Validation')
            .updateValidationChanin,
        new MerchantWalletValidation('Merchant Wallet Validation')
            .validationErrorHandle,
        new MerchantWalletController().update);
  }
}
