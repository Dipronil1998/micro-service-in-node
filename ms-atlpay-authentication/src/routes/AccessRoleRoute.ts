import {AccessRoleController} from '../controller/AccessRoleController';
import {AppRoute} from './AppRoute';
/**
 * AccessRole Route
 * @class{AccessRoleRoute}
 * @extends{AppRoute}
 */
export class AccessRoleRoute extends AppRoute {
  /**
     * Constructor
     * @param{string} path
     */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
     * Route method
     */
  private initializeRoutes() {
    this._router.get(this._path, new AccessRoleController().find);
    this._router.get(this._path + '/merchant',
        new AccessRoleController().getMerchant);
    this._router.get(this._path + '/admin',
        new AccessRoleController().getAdmin);
  }
}
