import {unauthorizedClient} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Unauthorized Client Exception
 * @class{UnauthorizedClientException}
 * @extends{BaseException}
 */
export class UnauthorizedClientException extends BaseException {
  /**
   * Constructor Method.
   * @param{string} message
   */
  constructor(message: string) {
    super(message, unauthorizedClient);
  }
}
