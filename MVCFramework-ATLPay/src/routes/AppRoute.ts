import express, {Router} from 'express';
/**
 * AppRoute Class
 * @class
 */
export class AppRoute {
  protected _path : string;
  protected _router : Router;
  /**
   * Constructor
   * @constructor
   * @param{string} path
   */
  constructor(path: string) {
    this._path = path;
    this._router = express.Router();
  }
  /**
   * Returns path.
   * @return{string}
   */
  public get path(): string {
    return this._path;
  }

  /**
   * Sets path.
   * @param{string} path
   */
  public set path(path: string) {
    this._path = path;
  }

  /**
   * Returns route.
   * @return{string}
   */
  public get router(): Router {
    return this._router;
  }

  /**
   * Sets router.
   * @param{string} router
   */
  public set router(router: Router) {
    this._router = router;
  }
}
