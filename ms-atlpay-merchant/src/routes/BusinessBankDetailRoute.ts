import {BusinessBankDetailController}
  from '../controller/BusinessBankDetailController';
import {BusinessBankDetailValidation}
  from '../validation/BusinessBankDetailValidation';
import {AppRoute} from './AppRoute';
/**
 * Merchnat Document Route
 * @class{MerchnatDocumentRoute}
 */
export class BusinessBankDetailRoute extends AppRoute {
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
    this._router.get(this._path, new BusinessBankDetailController().find);
    this._router.get(this._path + '/:id',
        new BusinessBankDetailController().get);
    this._router.put(this._path + '/:id',
        new BusinessBankDetailValidation('Business Bank Detail Validation')
            .updateValidationChain,
        new BusinessBankDetailValidation('Business Bank Detail Validation')
            .validationErrorHandle,
        new BusinessBankDetailController().update);
  }
}
