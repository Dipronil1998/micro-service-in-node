import {BusinessRoleController} from '../controller/BusinessRoleController';
import {BusinessRoleValidation} from '../validation/BusinessRoleValidation';
import {AppRoute} from './AppRoute';

/**
 * BusinessRoleRoute
 * @class
 */
export class BusinessRoleRoute extends AppRoute {
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
    this._router.get(this._path, new BusinessRoleController().find);
    this._router.get(this._path + '/:code',
        new BusinessRoleValidation('Business Role')
            .paramValidateChain,
        new BusinessRoleValidation('Business Role')
            .validationErrorHandle,
        new BusinessRoleController().get);
  }
}
