import {Response} from 'express';
import {AppService} from './AppService';
import {httpSuccessCode,
  httpInternalServerErrorCode,
  generalServerErrorMessage,
  invalidInputMessage,
  httpBadRequestCode}
  from './../../config/bootstrap';
import {BaseException} from '../exception/BaseException';
import {ErrorResponse,
  SuccessResponseMessage} from '../interface/types/Response';

/**
 * Response Service Class
 * @class
 * @extends{AppService}
 */
export class ResponseService extends AppService {
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('Response Service');
  }
  /**
    * Send Success Response.
    * @param{Response} res response of HTTP Request
    * @param{any} data Information to be sent
    */
  public sendSuccessResponse(res: Response, data: any): void {
    res.setHeader('Content-Type', 'application/json');
    if (typeof(data)==='string') {
      const response : SuccessResponseMessage =
        {success: true, info: {message: data}};
      res.status(httpSuccessCode).send(response)
          .end();
    } else {
      res.status(httpSuccessCode).send({success: true, info: data}).end();
    }
  }
  /**
    * Send Error Response.
    * @param{Response} res Send Error response
    * @param{any} error Error
    */
  public sendErrorResponse(res: Response, error: any ): void {
    let errorCode : number = httpInternalServerErrorCode;
    let errors : Object;
    if (error instanceof BaseException) {
      errorCode = error.status;
    } else if (error instanceof SyntaxError) {
      errorCode = httpBadRequestCode;
      error.message = invalidInputMessage;
    } else {
      errorCode = httpInternalServerErrorCode;
      error.message = generalServerErrorMessage;
    }
    // Converting error message of type string into json object.
    if (typeof error.message === 'string') {
      errors = {'error': error.message};
    } else {
      errors = error.message;
    }
    const errorResponse : ErrorResponse = {success: false, errors: errors};
    res.setHeader('Content-Type', 'application/json');
    res.status(errorCode).send(errorResponse).end();
  }
  /**
   * End Responses.
   * @param{Response} res - Resonse
   */
  public endResponse(res: Response) {
    res.end();
  }
}
