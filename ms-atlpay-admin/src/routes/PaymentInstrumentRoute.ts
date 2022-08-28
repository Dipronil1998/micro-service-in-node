import {PaymentInstrumentController}
  from '../controller/PaymentInstrumentController';
import {AppRoute} from './AppRoute';

/**
 * PaymentInstrumentRoute
 * @class
 * @extends{AppRoute}
 */
export class PaymentInstrumentRoute extends AppRoute {
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
    this._router.post(this._path,
        new PaymentInstrumentController().create);
    this._router.put(this._path+'/:id',
        new PaymentInstrumentController().update);
    this._router.get(this._path, new PaymentInstrumentController().find);
  }
}
