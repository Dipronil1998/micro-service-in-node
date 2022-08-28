import {httpInvalidAppCredential,
  unauthorizedClient} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Invalid App Credential Exception
 * @class
 * @extends{BaseException}
 */
export class InvalidAppCredentialException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   */
  constructor(message : string = httpInvalidAppCredential) {
    super(message, unauthorizedClient);
  }
}
