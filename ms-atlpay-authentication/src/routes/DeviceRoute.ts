import {DeviceController} from '../controller/DeviceController';
import {UserAuthenticationValidation}
  from '../validation/UserAuthenticationValidation';
import {AppRoute} from './AppRoute';

/**
 * DeviceRoute
 * @class
 */
export class DeviceRoute extends AppRoute {
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
    this._router.get(this._path, new DeviceController().find);

    this._router.get(this._path + '/:email',
        new UserAuthenticationValidation('Device validator')
            .paramValidateChain,
        new UserAuthenticationValidation('Device validator')
            .validationErrorHandle,
        new DeviceController().get);
  }
}
