import {unauthorizedClient, unauthorizedClientMessage}
  from '../../config/bootstrap';
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
   * @param{number} status
   */
  constructor(message: string = unauthorizedClientMessage,
      status : number = unauthorizedClient) {
    super(message, status);
  }
}
