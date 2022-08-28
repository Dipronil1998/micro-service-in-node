import {NextFunction, Request, Response} from 'express';
import {ResponseService} from '../service/ResponseService';
import {generalServerErrorMessage} from '../../config/bootstrap';
/**
 *  Error Handling Middleware
 *  @class
 */
export class ErrorHandlerMiddleware {
  /**
     * Error Handler
     * @param{any} err -error
     * @param{Request} req -Request
     * @param{Response} res - Response
     * @param{NextFunction} next - next function
     */
  public errorHandler = function(err: any,
      req: Request, res: Response,
      next: NextFunction) {
    let error: any = {};
    if (err && err.status && err.message) {
      error = err;
    } else {
      error.message = err.stack || err.message ||
                err ||
                generalServerErrorMessage;
    }
    new ResponseService().sendErrorResponse(res, error);
  };
};
