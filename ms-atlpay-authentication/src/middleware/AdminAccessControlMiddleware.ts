import {NextFunction, Request, Response} from 'express';
import {missingAuthenticationToken,
  unauthorizedClientMessage}
  from '../../config/bootstrap';
import {MissingAuthenticationTokenException}
  from '../exception/MissingAuthenticationTokenException';
import {UnauthorizedClientException}
  from '../exception/UnauthorizedClientException';
import {ResponseService}
  from '../service/ResponseService';
import {JsonWebToken}
  from '../utils/JsonWebToken';
/**
 * Admin access Control Middleware
 * @class{AdminAccessControlMiddleware}
 */
export class AdminAccessControlMiddleware {
  /**
   * Verify JWT token
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public verifyToken =
    (request: Request,
        response: Response,
        next: NextFunction) => {
      const authenticationHeader: string | undefined =
          request.headers?.authorization;

      if (authenticationHeader) {
        const token: string = authenticationHeader.split(' ')[1];
        try {
          // const decode: string | JwtPayload =
          new JsonWebToken().verifyAccessToken(token);
          next();
        } catch (error) {
          const unauthorizedClientException:
              UnauthorizedClientException =
              new UnauthorizedClientException(unauthorizedClientMessage);
          new ResponseService()
              .sendErrorResponse(response, unauthorizedClientException);
        }
      } else {
        const missingAuthToken:
            MissingAuthenticationTokenException =
            new MissingAuthenticationTokenException(missingAuthenticationToken);
        new ResponseService().sendErrorResponse(response, missingAuthToken);
      }
    };
}
