import EventEmitter from 'events';
import {Request, Response} from 'express';
/**
 * Application controller class for organization of business logic.
 * @class
 */
export class AppController {
  /**
   * The name of this controller
   * var{string}
   */
  protected _name : string;
  /**
   * An instance of Request that contains information about the current request.
   * @var{Request}
   */
  protected _request : Request;
  /**
   * An instance of a Response object that contains
   * information about the impending response.
   * @var{Response}
   */
  protected _response : Response;
  /**
   * Settings for pagination.
   * @var{Array<any>}
   */
  protected _pagination : Array<any>;
  /**
   * Set to true to automatically render the view
   * @var{boolean}
   */
  protected _autoRender : boolean = true;
  /**
   * Middlewares list
   * @var{Array<any>}
   */
  protected _middlewares : Array<any> = [];

  /**
   * Constructor.
   * @constructor
   * @param{string} name
   */
  constructor(
      name: string,
  ) {
    this._name = name;
  }
  /**
   * Returns the controller name.
   * @return{string}
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Sets the controller name.
   * @param{string} name
   */
  public set name(name: string) {
    this._name = name;
  }
  /**
   * Returns the request instance.
   * @return{Request}
   */
  public get request(): Request {
    return this._request;
  }
  /**
   * Sets the request instance.
   * @param{Request} request
   */
  public set request(request: Request) {
    this._request = request;
  }
  /**
   * Returns the response instance
   * @return{Response}
   */
  public get response(): Response {
    return this._response;
  }
  /**
   * Sets the response instance
   * @param{Response} response
   */
  public set response(response: Response) {
    this._response = response;
  }
  /**
   * Returns Settings for pagination.
   * @return{Array<any>}
   */
  public get pagination(): Array<any> {
    return this._pagination;
  }
  /**
   * Sets Settings for pagination.
   * @param{Array<any>} pagination
   */
  public set pagination(pagination: Array<any>) {
    this._pagination = pagination;
  }
  /**
   * Returns auto render option
   * @return{boolean}
   */
  public get autoRender(): boolean {
    return this._autoRender;
  }
  /**
   * Sets auto render option
   * @param{boolean} autoRender
   */
  public set autoRender(autoRender: boolean) {
    this._autoRender = autoRender;
  }
  /**
   * Returns middlewares
   * @return{Array<any>}
   */
  public get middlewares(): Array<any> {
    return this._middlewares;
  }
  /**
   * Sets middlewares
   * @param{Array<any>}  middlewares
   */
  public set middlewares(middlewares : Array<any> ) {
    this._middlewares = middlewares;
  }
  /**
   * Add a middleware
   * @param{any} middleware
   */
  public addMiddleware(middleware : any) {
    this._middlewares.push(middleware);
  }
  /**
   * Returns true if an action should be rendered
   * automatically.
   * @return{boolean}
   */
  public isAutoRenderEnabled(): boolean {
    return this._autoRender;
  }
  /**
   * Enable automatic action rendering.
   * @return{AppController}
   */
  public enableAutoRender(): AppController {
    this._autoRender = true;
    return this;
  }
  /**
   * Disable automatic action rendering.
   * @return{AppController}
   */
  public disableAutoRender() : AppController {
    this._autoRender = false;
    return this;
  }
  /**
   * Called before the controller action. You can use
   * this method to configure and customize components
   * or perform logic that needs to happen before each
   * controller action.
   * @param{EventEmitter} event
   */
  public beforeFilter(event : EventEmitter) {

  }
  /**
   * Called after the controller action is run, but
   * before the view is rendered. You can use this
   * method to perform logic or set view variables
   * that are required on every request.
   * @param{EventEmitter} event
   */
  public beforeRender(event : EventEmitter) {
  }
  /**
   * The beforeRedirect method is invoked when
   * the controller's redirect method is called
   * but before any further action.
   * @param{EventEmitter} event
   */
  public beforeRedirect(event : EventEmitter ) {

  }
  /**
   * Called after the controller action is run and rendered.
   * @param{EventEmitter} event
   */
  public afterFilter(event : EventEmitter ) {

  }
}
