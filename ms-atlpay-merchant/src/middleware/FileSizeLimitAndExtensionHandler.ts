import {NextFunction, Request, Response} from 'express';
import {
  fileExtensionAllowed,
  fileSizeExceeded,
  invalidFileType,
  payLoadTooLargeCode,
  unsupportedMediaTypeCode,
} from
  '../../config/bootstrap';
import {FileSizeLimitAndExtensionException} from
  '../exception/FileSizeLimitAndExtensionException';
/**
 * File Size and extension Handling Middlerware
 * @class
 */
export class FileSizeLimitAndExtensionHandler {
  /**
   * File size Handler
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public limitHandler = (request: Request
      , response: Response, next: NextFunction) => {
    const filesizeLimitException:
      FileSizeLimitAndExtensionException =
      new FileSizeLimitAndExtensionException(
          fileSizeExceeded, payLoadTooLargeCode);
    next(filesizeLimitException);
  };
  /**
   * File extension Handler
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public fileExtensionhandler = (
      request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      if (request.files) {
        const fileKeys: Array<string> = Object.keys(request.files);
        for (const fileKey of fileKeys) {
          let flagToCheckFileExtension: boolean = false;
          // @ts-ignore
          const noOfExtension: number = fileExtensionAllowed.length;
          for (let index = 0; index < noOfExtension; index++) {
            if (request.files &&
              request.files[fileKey] &&
              // @ts-ignore
              request.files[fileKey].name
                  .endsWith(fileExtensionAllowed[index])) {
              flagToCheckFileExtension = true;
            }
          }
          if (!flagToCheckFileExtension) {
            throw new FileSizeLimitAndExtensionException(
                invalidFileType, unsupportedMediaTypeCode);
          }
        }
        next();
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}
