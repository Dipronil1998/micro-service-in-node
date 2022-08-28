import {BaseValidator} from './BaseValidator';
import {param, ValidationChain} from 'express-validator';
/**
 * BusinessLegalEntityTypesValidation Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class BusinessLegalEntityTypesValidation extends BaseValidator {
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
        .isUppercase().withMessage('Should be in UPPERCASE')
        .trim(),
  ];
}
