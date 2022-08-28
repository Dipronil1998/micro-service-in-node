import {MailController} from '../controller/MailController';
import {MailValidator} from '../validation/MailValidator';
import {AppRoute} from './AppRoute';
/**
 * Mail Route class
 * @class
 * @extends{AppRoute}
 */
export class MailRoute extends AppRoute {
  /**
   * Constructor Method.
   * @param{string} path
   */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
   * Route initialization Method.
   * @function
   */
  private initializeRoutes() : void {
    this._router.post(this._path+'/send',
        new MailValidator().validationChain,
        new MailValidator().validationErrorHandle,
        new MailController().send);
  }
}
