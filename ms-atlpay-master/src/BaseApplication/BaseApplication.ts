import express from 'express';
import {AppRoute} from '../routes/AppRoute';
/**
 * Base class for application classes.
 * @abstract
 */
export abstract class BaseApplication {
  /**
     * Contains the path of the config directory
     * @var{string}
    */
  protected _configDir : string;
  /**
   * Express application instance
   * @var{express.Application}
   */
  protected _app : express.Application;

  /**
     * Configuration directory path
     * @param{string} configDir
     */
  constructor(configDir : string) {
    this._configDir = configDir;
    this._app = express();
  }

  /**
  * get function for app
  * @return{express.Application}
  */
  public get app():express.Application {
    return this._app;
  }
    /**
     * The middleware queue to set in your App Class
     * @abstract
     * @param{Array<any>} middleware
     * @returns{Array<any>}
     */
    abstract middlewares(middleware : Array<any>) : Array<any>;
    /**
     * Route queue to set in App class
     * @param{Array<AppRoute>} routes
     * @returns{void}
     */

    /**
   * Add universal middleware
   * @param{any} middleware
   */
    use(middleware: any) {
      this._app.use(middleware);
    }
    abstract routes(routes : Array<AppRoute>): void;
    /**
     * Load all the application configuration and bootstrap logic.
     * @return{string}
     */
    public bootstrap() {
      return this._configDir+'/bootstrap.ts';
    }
}
