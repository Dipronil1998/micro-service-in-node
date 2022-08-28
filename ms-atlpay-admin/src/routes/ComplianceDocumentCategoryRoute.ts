import {ComplianceDocumentCategoryController}
  from '../controller/ComplianceDocumentCategoryController';
import {ComplianceDocumentCategoryValidation}
  from '../validation/ComplianceDocumentCategoryValidation';
import {AppRoute} from './AppRoute';

/**
 * ComplianceDocumentCategory class
 * @class
 */
export class ComplianceDocumentCategoryRoute extends AppRoute {
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
    this._router.get(this._path,
        new ComplianceDocumentCategoryController().find);

    this._router.get(this._path + '/:code',
        new ComplianceDocumentCategoryValidation(
            'ComplianceDocumentCategory Validation')
            .paramValidateChain,
        new ComplianceDocumentCategoryValidation(
            'ComplianceDocumentCategory Validation')
            .validationErrorHandle,
        new ComplianceDocumentCategoryController().get);
  }
}
