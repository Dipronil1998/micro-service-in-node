import {PlatfromController} from '../controller/PlatformController';
import {AppRoute} from './AppRoute';
/**
 * Platform Route
 * @class
 * @extends{AppRoute}
 */
export class PlatformRoute extends AppRoute {
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
  private initializeRoutes():void {
    this._router.use(this._path+'/verify',
        new PlatfromController().authVerifySecretToken);
    this._router.get(this._path, new PlatfromController().find);
    this._router.get(this._path+'/:code', new PlatfromController().get);
    this._router.put(this._path+'/:code/enable',
        new PlatfromController().enable);
    this._router.put(this._path+'/:code/disable',
        new PlatfromController().disable);
  };
}
