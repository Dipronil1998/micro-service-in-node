import {BusinessLegalEntityTypesController} from
  '../controller/BusinessLegalEntityTypesController';
import {BusinessLegalEntityTypesValidation} from
  '../validation/BusinessLegalEntityTypesValidation';
import {AppRoute} from './AppRoute';

/**
 * BusinessLegalEntityTypeRoute
 * @class
 */
export class BusinessLegalEntityTypeRoute extends AppRoute {
  /**
   * Constructor
   * @param{string} path
   */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
   * Router method
   */
  private initializeRoutes() {
    this._router.get(this._path, new BusinessLegalEntityTypesController().find);
    this._router.get(this._path + '/:code',
        new BusinessLegalEntityTypesValidation('Business Legal Entity Type')
            .paramValidateChain,
        new BusinessLegalEntityTypesValidation('Business Legal Entity Type')
            .validationErrorHandle,
        new BusinessLegalEntityTypesController().get);
  }
}
