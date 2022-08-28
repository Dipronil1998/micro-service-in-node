import {BaseValidator} from './BaseValidator';
import {param, ValidationChain} from 'express-validator';
/**
 * CivilStatusValidation Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class CivilStatusValidation extends BaseValidator {
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
  public validationChain: ValidationChain[] = [];

  /**
   * paramValidationChain
   */
  public paramValidateChain: ValidationChain[] = [
    param('code')
        .isString().withMessage('Should be string value')
        .isUppercase().withMessage('Should be in UPPERCASE')
        .trim(),
  ];
}
