import {vsprintf} from 'sprintf-js';
/**
 * Base class for exception
 * @class
 * @extends{Error}
 */
export class BaseException extends Error {
  /**
  * Status code of exception
  * @var{number}
  */
  protected _status: number;
  /**
   * Template string that has attributes sprintf()'ed into it.
   * @var{string}
   */
  protected _messageTemplate : string;
  /**
   * Constructor
   * @constructor
   * @param{string| Array<string>} message
   * @param{number} status
   * @param{string} messageTemplate
   */
  constructor(message : string| Array<string>,
      status : number = 500,
      messageTemplate : string = '') {
    if (Array.isArray(message)) {
      message = vsprintf(messageTemplate, message);
    }
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this._status = status;
    this._messageTemplate = messageTemplate;
  }
  /**
   * Returns status
   * @return{number} status
   */
  public get status(): number {
    return this._status;
  }
  /**
   * Sets status
   * @param{number} status
   */
  public set status(status: number) {
    this._status = status;
  }
  /**
   * Returns message Template
   * @return{string} messageTemplate
   */
  public get messageTemplate(): string {
    return this._messageTemplate;
  }
  /**
   * Sets message Template
   * @param{string} messageTemplate
   */
  public set messageTemplate(messageTemplate: string) {
    this._messageTemplate = messageTemplate;
  }
}
