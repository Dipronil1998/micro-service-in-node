import {BaseException} from './BaseException';
/**
 * Page Not Found Exception Exception
 * @class
 * @extends{BaseException}
 */
export class PageNotFoundException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message : string, status : number) {
    super(message, status);
  }
}
