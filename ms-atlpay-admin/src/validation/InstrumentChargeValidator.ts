import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
/**
 * Instrument Charge Validator Class
 * @class
 * @extends{BaseValidator}
 */
export class InstrumentChargeValidator extends BaseValidator {
  /**
       * Constructor Method.
       * @param{string} name Name of Validator.
       */
  constructor(name: string) {
    super(name);
  }

  private amountValidationChain: ValidationChain =
    body('amount')
        .trim()
        .isNumeric()
        .withMessage('Amount should be numeric')
        .isLength({min: 1, max: 20})
        .withMessage('Amount should be min 1 max 20 digit');

  private flatFeesValidationChain: ValidationChain =
    body('flat_fees')
        .trim()
        .isNumeric()
        .withMessage('Flat Fees should be numeric')
        .isLength({min: 1, max: 20})
        .withMessage('Flat Fees should be min 1 max 20 digit');

  private percentFeesValidationChain: ValidationChain =
    body('percent_fees')
        .trim()
        .isNumeric()
        .withMessage('Percent Fees should be numeric')
        .isLength({min: 1, max: 20})
        .withMessage('Percent Fees should be min 1 max 20 digit');

  private minFeesValidationChain: ValidationChain =
    body('min_fees')
        .trim()
        .isNumeric()
        .withMessage('Min Fees should be numeric')
        .isLength({min: 1, max: 20})
        .withMessage('Min Fees should be min 1 max 20 digit');

  private maxFeesValidationChain: ValidationChain =
    body('max_fees')
        .trim()
        .isNumeric()
        .withMessage('Max Fees should be numeric')
        .isLength({min: 1, max: 20})
        .withMessage('Max Fees should be min 1 max 20 digit');

  /**
       * @inheritdoc
       * validationChain
       */
  public validationChain: ValidationChain[] = [
    this.amountValidationChain.optional({nullable: true}),
    this.flatFeesValidationChain.optional({nullable: true}),
    this.percentFeesValidationChain.optional({nullable: true}),
    this.minFeesValidationChain.optional({nullable: true}),
    this.maxFeesValidationChain.optional({nullable: true}),
  ];

  /**
       * @inheritdoc
       * Update Validation Chain
       */
  public updateValidationChain: ValidationChain[] = [
    this.amountValidationChain.optional({nullable: true}),
    this.flatFeesValidationChain.optional({nullable: true}),
    this.percentFeesValidationChain.optional({nullable: true}),
    this.minFeesValidationChain.optional({nullable: true}),
    this.maxFeesValidationChain.optional({nullable: true}),
  ];

  public paramValidationChain: ValidationChain[] = [
    param('id')
        .trim(),
  ];
}
