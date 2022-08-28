import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Invalid Input Exception.
 * @class
 * @extends{BaseException}
 */
export class InvalidInputException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message: string, status: number =
  httpBadRequestCode) {
    /**
     * Constructor Method.
     * @constructor
     */
    super(message, status);
  }
}
