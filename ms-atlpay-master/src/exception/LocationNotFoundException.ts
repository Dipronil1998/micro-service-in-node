import {BaseException} from './BaseException';
import {httpBadRequestCode} from '../../config/bootstrap';

/**
 * Location Not Found Exception
 * @class
 * @extends{BaseException}
 */
export class LocationNotFoundException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message: string, status: number = httpBadRequestCode) {
    super(message, status);
  }
}
