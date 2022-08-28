import {httpPageNotFoundCode}
  from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Data Not Found Exception Exception
 * @class
 * @extends{BaseException}
 */
export class DataNotFoundException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message: string, status: number =
  httpPageNotFoundCode) {
    super(message, status);
  }
}
