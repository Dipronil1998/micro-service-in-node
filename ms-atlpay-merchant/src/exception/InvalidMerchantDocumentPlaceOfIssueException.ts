import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Invalid Merchant Document Place Of Issue Exception
 * @class
 * @extends{BaseException}
 */
export class InvalidMerchantDocumentPlaceOfIssueException
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
