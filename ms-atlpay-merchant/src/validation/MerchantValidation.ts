import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';

/**
 * Merchant Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class MerchantValidation extends BaseValidator {
  private _code: ValidationChain = body('merchant_code')
      .isString()
      .withMessage('Merchant Code should be Alphabetic')
      .isLength({min: 2, max: 10})
      .withMessage('Merchant Code Should be min 2 max 10 character');
  private _title: ValidationChain = body('merchant_title')
      .isString()
      .withMessage('Merchant Title Should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Merchant Title Should be min 2 max 40');
  private _subcriptionType: ValidationChain = body('merchant_subcription_type')
      .notEmpty()
      .withMessage('Merchant Subcription Type Should not be Empty')
      .bail()
      .isString()
      .withMessage('Merchant Subcription Type should be String')
      .isLength({min: 2, max: 40})
      .withMessage(
          'Merchant Subcription Type should be min 2 max 40 character');
  private _logo: ValidationChain = body('merchant_logo')
      .isString()
      .withMessage('Merchant Logo Should be String');

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
      this._code.optional({nullable: true}),
      this._title.optional({nullable: true}),
      this._subcriptionType,
      this._logo.optional({nullable: true}),
    ];

  public updateValidationChain: ValidationChain[] =
    [
      param('id').trim(),
      body('merchant_code')
          .optional({nullable: true})
          .isString()
          .withMessage('Merchant Code should be Alphabetic')
          .isLength({min: 2, max: 10})
          .withMessage('Merchant Code Should be min 2 max 10 character'),
      body('merchant_title')
          .optional({nullable: true})
          .isString()
          .withMessage('Merchant Title Should be Alphabetic')
          .isLength({min: 2, max: 40})
          .withMessage('Merchant Title Should be min 2 max 40'),
      body('merchant_subcription_type')
          .optional({nullable: true})
          .isString()
          .withMessage('Merchant Subcription Type should be String')
          .isLength({min: 2, max: 40})
          .withMessage(
              'Merchant Subcription Type should be min 2 max 40 character'),
      body('merchant_logo')
          .optional({nullable: true})
          .isString()
          .withMessage('Merchant Logo Should be String'),
    ];

  /**
       * paramValidationChain
       */
  public paramValidateChain: ValidationChain[] =
    [param('id').trim()];
}
