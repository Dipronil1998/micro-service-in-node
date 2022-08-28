import {BaseValidator} from './BaseValidator';
import {param, ValidationChain} from 'express-validator';
/**
 * UserAuthentication Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class UserLoginLogValidation extends BaseValidator {
  private _emailValidationRule: ValidationChain =
    param('email')
        .trim()
        .isEmail()
        .withMessage('Email is not valid');
  /**
     * Constructor Method.
     * @param{string} name Name of Validator.
    */
  constructor(name: string) {
    super(name);
  }
  /**
     * @inheritdoc
     * validationChain
    */
  public validationChain: ValidationChain[] =
    [
      this._emailValidationRule,
    ];
}
