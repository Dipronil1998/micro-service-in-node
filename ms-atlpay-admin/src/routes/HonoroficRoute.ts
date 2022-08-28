import {HonoroficController}
  from '../controller/HonoroficController';
import {HonoroficValidation}
  from '../validation/HonoroficValidation';
import {AppRoute} from './AppRoute';

/**
 * UserRoute class
 * @class
 */
export class HonoroficRoute extends AppRoute {
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
        new HonoroficController().find);

    this._router.get(this._path + '/:code',
        new HonoroficValidation('Honorofic validator')
            .paramValidateChain,
        new HonoroficValidation('Honorofic validator')
            .validationErrorHandle,
        new HonoroficController().get);
  }
}
