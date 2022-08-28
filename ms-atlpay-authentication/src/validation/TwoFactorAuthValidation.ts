import {BaseValidator} from './BaseValidator';
import {body, ValidationChain} from 'express-validator';
import {otpLength} from '../../config/bootstrap';

/**
 * Two Factor Auth Validation
 * @class
 * @extends{BaseValidator}
 */
export class TwoFactorAuthValidation extends BaseValidator {
  /**
    * Constructor Method.
    * @param{string} name Name of Validator.
    */
  constructor(name: string) {
    super(name);
  }

  /**
    * validationChain
    */
  public validationChain: ValidationChain[] =
    [
      body('otp')
          .trim()
          .notEmpty()
          .withMessage('OTP Should not be Empty')
          .bail()
          .isNumeric()
          .withMessage('OTP Should be Numeric Value')
          .bail()
          .isLength({min: otpLength, max: otpLength})
          .withMessage('OTP Lenth Should be '+otpLength),
    ];
}
