import {DocumentRejectReasonController}
  from '../controller/DocumentRejectReasonController';
import {DocumentRejectReasonValidation}
  from '../validation/DocumentRejectReasonValidation';
import {AppRoute} from './AppRoute';

/**
 * DocumentRejectReasonRoute class
 * @class
 */
export class DocumentRejectReasonRoute extends AppRoute {
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
        new DocumentRejectReasonController().find);

    this._router.get(this._path + '/:id',
        new DocumentRejectReasonValidation(
            'DocumentRejectReason Validation')
            .paramValidateChain,
        new DocumentRejectReasonValidation(
            'DocumentRejectReason Validation')
            .validationErrorHandle,
        new DocumentRejectReasonController().get);
  }
}
