import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Invalid Merchant Document Type Text Exception
 * @class
 * @extends{BaseException}
 */
export class InvalidMerchantDocumentTypeTextException
  extends BaseException {
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
