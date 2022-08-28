import {BaseValidator} from './BaseValidator';
import {param, ValidationChain} from 'express-validator';
/**
 * ComplianceDocumentCategoryValidation Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class ComplianceDocumentCategoryValidation extends BaseValidator {
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
        .isLength({min: 3, max: 3}).withMessage('Length should be 3')
        .trim(),
  ];
}
