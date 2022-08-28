import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Current And New Password Match Exception
 * @class
 * @extends{BaseException}
 */
export class CurrentAndNewPasswordMatchException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message: string, status: number =
  httpBadRequestCode) {
    super(message, status);
  }
}
