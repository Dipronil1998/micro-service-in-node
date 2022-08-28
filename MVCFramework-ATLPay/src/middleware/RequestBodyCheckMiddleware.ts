import {NextFunction, Request, Response} from 'express';
import {invalidInputMessage} from '../../config/bootstrap';
import {InvalidInputException} from '../exception/InvalidInputException';
/**
 * Request body and Header type check Middleware
 * @class{RequestBodyCheckMiddleware}
 */
export class RequestBodyCheckMiddleware {
  /**
     * Request body content Check for coreect JSON type
     * @param{Request} req - Request
     * @param{Response} res - Response
     * @param{NextFunction} next - Next Function
     */
  public jsonBodyContentCheck = (req: Request,
      res: Response,
      next: NextFunction) => {
    try {
      if (req.headers['content-type'] === 'application/json'&& req.body) {
        try {
          JSON.parse(JSON.stringify(req.body));
          next();
        } catch (error: any) {
          const invalidInputException: InvalidInputException =
                        new InvalidInputException(invalidInputMessage);
          next(invalidInputException);
        }
      } else {
        const invalidInputException: InvalidInputException =
                    new InvalidInputException(invalidInputMessage);
        next(invalidInputException);
      }
      next();
    } catch (error) {
      const invalidInputException: InvalidInputException =
                new InvalidInputException(invalidInputMessage);
      next(invalidInputException);
    }
  };
}
