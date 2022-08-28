import {ContinentController} from '../controller/ContinentController';
import {AppRoute} from './AppRoute';

/**
 * Continent Route Class
 * @class
*/
export class ContinentRoute extends AppRoute {
  /**
   * Initializes a new instance
   * @param{string} path
  */
  constructor(path: string) {
    /**
     * @param path
    */
    super(path);
    this.initializeRoutes();
  }
  /**
   * router methods
  */
  private initializeRoutes() {
    this._router.get(this._path,
        new ContinentController('continent').find);

    this._router.get(this._path + '/:code',
        new ContinentController('continent').get);
  }
}
