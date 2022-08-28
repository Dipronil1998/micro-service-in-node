import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Invalid Merchant Document Issuer Exception
 * @class
 * @extends{BaseException}
 */
export class InvalidMerchantDocumentIssuerException extends BaseException {
  /**
   * Constructor
   * @constructor
   * @param{string} message Exception message
   * @param{number} status status code
   */
  constructor(message : string) {
    super(message, httpBadRequestCode);
  }
}
