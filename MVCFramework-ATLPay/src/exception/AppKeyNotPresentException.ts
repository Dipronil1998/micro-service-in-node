import {forbidden, httpAppCredentialsNotPresent} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * App Key Not Present Exception
 * @class
 * @extends{BaseException}
 */
export class AppKeyNotPresentException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   */
  constructor(message : string = httpAppCredentialsNotPresent) {
    super(message, forbidden);
  }
}
