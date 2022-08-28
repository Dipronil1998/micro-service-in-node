import {BusinessRepresentativeController}
  from '../controller/BusinessRepresentativeController';
import {BusinessRepresentativeValidation} from
  '../validation/BusinessRepresentativeValidation';
import {AppRoute} from './AppRoute';
/**
 * Merchnat Document Route
 * @class{MerchnatDocumentRoute}
 */
export class BusinessRepresentativeRoute extends AppRoute {
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
    this._router.get(this._path, new BusinessRepresentativeController().find);
    this._router.get(this._path + '/:id', new BusinessRepresentativeController()
        .get);
    this._router.put(this._path+'/:id',
        new BusinessRepresentativeValidation(
            'BusinessRepresentativeValidation').updateValidationChain,
        new BusinessRepresentativeValidation(
            'BusinessRepresentativeValidation').validationErrorHandle,
        new BusinessRepresentativeController().update,
    );
  }
}
