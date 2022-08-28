import {BusinessOwnerController}
  from '../controller/BusinessOwnerController';
import {BusinessOwnerValidation} from '../validation/BusinessOwnerValidation';
import {AppRoute} from './AppRoute';
/**
 * Merchnat Document Route
 * @class{MerchnatDocumentRoute}
 */
export class BusinessOwnerRoute extends AppRoute {
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
    this._router.get(this._path, new BusinessOwnerController().find);
    this._router.get(this._path + '/:id', new BusinessOwnerController().get);
    this._router.put(this._path + '/:id',
        new BusinessOwnerValidation('Business Owner Validation')
            .updateValidationChain,
        new BusinessOwnerValidation('Business Owner Validation')
            .validationErrorHandle,
        new BusinessOwnerController().update);
  }
}
