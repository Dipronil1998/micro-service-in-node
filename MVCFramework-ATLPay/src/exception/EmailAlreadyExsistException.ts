import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Email Already Exsist Exception
 * @class
 * @extends{BaseException}
 */
export class EmailAlreadyExsistException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message : string, status : number =httpBadRequestCode) {
    super(message, status);
  }
}
