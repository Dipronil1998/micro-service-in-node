import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Password Reset Link Expire Exception
 * @class
 * @extends{BaseException}
 */
export class PasswordResetLinkExpireException extends BaseException {
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
