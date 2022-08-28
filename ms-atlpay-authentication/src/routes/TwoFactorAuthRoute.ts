import {TwoFactorAuthController} from '../controller/TwoFactorAuthController';
import {TwoFactorAuthValidation} from '../validation/TwoFactorAuthValidation';
import {AppRoute} from './AppRoute';
/**
 * Two factor Auth Route
 * @class
 * @extends{AppRoute}
 */
export class TwoFactorAuthRoute extends AppRoute {
  /**
       * Constructor Method.
       * @param{string} path -Path
       */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }

  /**
    * Route Method
    */
  private initializeRoutes(): void {
    this._router.post(this._path + '/verifyotp',
        new TwoFactorAuthValidation('Two Factor Auth Validation')
            .validationChain,
        new TwoFactorAuthValidation('Two Factor Auth Validation')
            .validationErrorHandle,
        new TwoFactorAuthController().validate);
  }
}
