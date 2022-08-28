import {NextFunction, Request, Response} from 'express';
import {ValidationChain,
  ValidationError,
  validationResult} from 'express-validator';
import {InvalidInputException} from '../exception/InvalidInputException';
import {ResponseService} from '../service/ResponseService';
/**
 * Validator Class for Request Validation.
 * @abstract
 */
export abstract class BaseValidator {
  /**
     * Name of the validator.
     * @var{string} - name
     */
  private _name : string;
  /**
     * Constructor Method.
     * @constructor
     * @param{string} name - Name
     */
  constructor(name: string) {
    this._name = name;
  }
    /**
     * Validate Rules  for Post method.
     * @abstract
     */
    abstract readonly validationChain : Array<ValidationChain>;
    /**
     * If Error found during validation, Handle Method
     * @param{Request} request - Request
     * @param{Response} response - Response
     * @param{NextFunction} next - Next function
     */
    public validationErrorHandle =
      (request: Request,
          response: Response,
          next : NextFunction): void=>{
        const validationErrors: ValidationError[] =
        validationResult(request).array();
        if (validationErrors.length!==0) {
          let validationErrorMessage : string ='';
          validationErrors.forEach((error) => {
            validationErrorMessage+= error.msg+' of '+error.param+'. ';
          });
          const invalidInputException :InvalidInputException =
            new InvalidInputException(validationErrorMessage.trim());
          new ResponseService()
              .sendErrorResponse(response, invalidInputException);
        } else {
          next();
        }
      };
}
