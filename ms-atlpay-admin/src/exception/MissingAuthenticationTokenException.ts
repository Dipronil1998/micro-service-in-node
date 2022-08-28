import {forbidden} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Missing Authentication Token Exception
 * @class{MissingAuthenticationTokenException}
 * @extends{BaseException}
 */
export class MissingAuthenticationTokenException extends BaseException {
  /**
   * Constructor Method.
   * @param{string} message
   */
  constructor(message: string) {
    super(message, forbidden);
  }
}
