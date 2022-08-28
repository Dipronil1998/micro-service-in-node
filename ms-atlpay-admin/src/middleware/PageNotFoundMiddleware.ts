import {NextFunction, Request, Response} from 'express';
import {httpPageNotFoundCode,
  httpPageNotFoundMessage}
  from '../../config/bootstrap';
import {BaseException} from '../exception/BaseException';
import {PageNotFoundException} from '../exception/PageNotFoundException';
/**
 * Page Not Found Middleware.
 * @class
 */
export class PageNotFoundMiddleware {
  /**
     * Page NOt found
     * @param{Request} req -Request
     * @param{Response} res - Response
     * @param{NextFunction} next - next function
     */
  public pageNotFound = function(req: Request,
      res: Response,
      next: NextFunction): void {
    const pageNotFountError: BaseException = new
    PageNotFoundException(httpPageNotFoundMessage,
        httpPageNotFoundCode);
    next(pageNotFountError);
  };
}
