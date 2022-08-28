import {httpBadRequestCode} from '../../config/bootstrap';
import {BaseException} from './BaseException';
/**
 * Input documents not found Exception
 * @class{InputDocumentException}
 */
export class InputDocumentException extends BaseException {
  /**
   * Constructor Method.
   * @param{string} message
   */
  constructor(message: string) {
    super(message, httpBadRequestCode);
  }
}
