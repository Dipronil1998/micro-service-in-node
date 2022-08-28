import {AdminLoginLogController} from '../controller/AdminLoginLogController';
import {AdminAccessControlMiddleware}
  from '../middleware/AdminAccessControlMiddleware';
import {AppRoute} from './AppRoute';

/**
 * AdminLoginLogRouter
 * @class
 */
export class AdminLoginLogRoute extends AppRoute {
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
        new AdminAccessControlMiddleware().verifyToken,
        new AdminLoginLogController().find);

    this._router.get(this._path + '/email/:email',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminLoginLogController().get);

    this._router.get(this._path + '/:id',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminLoginLogController().getLoginLogByAdminId);
  }
}
