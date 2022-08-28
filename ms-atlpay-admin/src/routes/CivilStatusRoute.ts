import {CivilStatusController} from
  '../controller/CivilStatusController';
import {CivilStatusValidation} from '../validation/CivilStatusValidation';
import {AppRoute} from './AppRoute';

/**
 * CivilStatusRoute
 * @class
 */
export class CivilStatusRoute extends AppRoute {
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
    this._router.get(this._path, new CivilStatusController().find);
    this._router.get(this._path + '/:code',
        new CivilStatusValidation('Civil Status')
            .paramValidateChain,
        new CivilStatusValidation('Civil Status')
            .validationErrorHandle,
        new CivilStatusController().get);
  }
}
