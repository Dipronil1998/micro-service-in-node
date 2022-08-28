import {MerchantDocumentController}
  from '../controller/MerchantDocumentController';
import {AppRoute} from './AppRoute';
/**
 * Merchnat Document Route
 * @class{MerchantDocumentRoute}
 */
export class MerchantDocumentRoute extends AppRoute {
  /**
   * Contructor Method.
   * @param{string} path
   */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
   * Initialize Route
   */
  private initializeRoutes() {
    this._router.get(this._path, new MerchantDocumentController().find);
    this._router.get(this._path + '/:id', new MerchantDocumentController().get);
  }
}
