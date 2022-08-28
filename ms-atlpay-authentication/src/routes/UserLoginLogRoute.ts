import {UserLoginLogController} from '../controller/UserLoginLogController';
import {UserLoginLogValidation} from '../validation/UserLoginLogValidation';
import {AppRoute} from './AppRoute';

/**
 * UserLoginLogRouter
 * @class
 */
export class UserLoginLogRoute extends AppRoute {
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
    this._router.get(this._path, new UserLoginLogController().find);

    this._router.get(this._path + '/email/:email',
        new UserLoginLogValidation('UserLoginLog validator')
            .validationChain,
        new UserLoginLogValidation('UserLoginLog validator')
            .validationErrorHandle,
        new UserLoginLogController().get);

    this._router.get(this._path + '/:id',
        new UserLoginLogController().getUserLoginLogById);

    this._router.put(this._path, new UserLoginLogController().update);
  }
}
