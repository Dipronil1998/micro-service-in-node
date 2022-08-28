import {LanguageController}
  from '../controller/LanguageController';
import {AppRoute} from './AppRoute';

/**
 * Language Route Class
 * @class
*/
export class LanguageRoute extends AppRoute {
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
        new LanguageController('Language').find);

    this._router.get(this._path + '/:code',
        new LanguageController('Language').get);
  }
}
