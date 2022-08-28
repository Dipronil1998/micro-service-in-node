import {InstrumentChargeController}
  from '../controller/InstrumentChargeController';
import {InstrumentChargeValidator}
  from '../validation/InstrumentChargeValidator';
import {AppRoute} from './AppRoute';

/**
 * Instrument Charge Route class
 * @class
 */
export class InstrumentChargeRoute extends AppRoute {
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
        new InstrumentChargeController().find);

    this._router.post(this._path+'/create',
        new InstrumentChargeValidator('InstrumentChargeValidator')
            .validationChain,
        new InstrumentChargeValidator('InstrumentChargeValidator')
            .validationErrorHandle,
        new InstrumentChargeController().create);

    this._router.put(this._path+'/update/:id',
        new InstrumentChargeValidator('InstrumentChargeValidator')
            .updateValidationChain,
        new InstrumentChargeValidator('InstrumentChargeValidator')
            .validationErrorHandle,
        new InstrumentChargeController().update);
  }
}
