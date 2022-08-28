import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Data Not Found Exception Exception
 * @class
 * @extends{BaseException}
 */
export class UserExsistException extends BaseException {
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
