import 'reflect-metadata';
import {BaseApplication} from './BaseApplication';
import {AppRoute} from '../routes/AppRoute';
import {DBService} from '../service/DBService';
import {portNumber} from './../../config/bootstrap';
import {RequestHandler} from 'express';
/**
 * Application Instance
 * @extends{BaseApplication}
 */
export class Application extends BaseApplication {
  /**
     * Constructor of Application
     * @constructor
     */
  constructor() {
    super('./config');
    this.connectToDatabase();
  }
  /**
     * @inheritdoc
     */
  middlewares(middlewares: any): any[] {
    middlewares.forEach( (middleware : any)=> {
      this._app.use('/v1/', middleware);
    });
    return middlewares;
  }
  /**
     * Add a middleware
     * @param{any} middleware
     */
  middleware(middleware: any) {
    this._app.use('/v1/', middleware);
  }
  /**
   * Add universal middleware
   * @param{any} middleware
   */
  use(middleware: any) {
    this._app.use(middleware);
  }
  /**
     * @inheritdoc
     */
  routes(routes: AppRoute[]): void {
    routes.forEach((route: AppRoute)=>{
      this._app.use('/v1/', route.router);
    });
  }
  /**
     * Create connections to databases.
     * @return{void}
     */
  private async connectToDatabase() : Promise<void> {
    try {
      await new DBService().connect();
      console.log('DB connected with postgres');
    } catch (error) {
      console.log('DB not connected');
      process.exit(1);
    }
  }
  /**
   * Initialize Swagger.
   * @param{Array<RequestHandler>} swaggerServe - Swagger Serve
   * @param{RequestHandler} swaggerSetup - Swagger Setup
   */
  public initializeSwagger(swaggerServe : RequestHandler[],
      swaggerSetup : RequestHandler) {
    this._app.use('/swagger', swaggerServe, swaggerSetup);
  }
  /**
     * Listen Connections
     * @return{void}
     */
  public listen() {
    this._app.listen(portNumber, ()=>{
      console.log('Server started at '+portNumber);
      this._app.emit('appStarted');
    });
  }
}
