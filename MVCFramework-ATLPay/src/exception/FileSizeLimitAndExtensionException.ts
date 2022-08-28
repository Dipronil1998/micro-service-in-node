import {BaseException} from './BaseException';
/**
 *  File size Limit Exception
 * @class{InputDocumentException}
 */
export class FileSizeLimitAndExtensionException extends BaseException {
  /**
   * Constructor Method.
   * @param{string} message
   * @param{number} status
   */
  constructor(message: string, status : number) {
    super(message, status);
  }
}
