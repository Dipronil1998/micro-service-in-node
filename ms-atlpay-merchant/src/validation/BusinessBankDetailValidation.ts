import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';

/**
 * BusinessBankDetail Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class BusinessBankDetailValidation extends BaseValidator {
  private _accountHolderName: ValidationChain = body('account_holder_name')
      .notEmpty()
      .withMessage('Account Holder Name Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Account Holder Name should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Account Holder Name Should be min 2 max 40 character');
  private _accountNumber: ValidationChain = body('account_number')
      .notEmpty()
      .withMessage('Account Number Should not be Empty')
      .bail()
      .isString()
      .withMessage('Account Number Should be String')
      .isLength({min: 5, max: 20})
      .withMessage('Account Number Should be min 5 max 20');
  private _branchName: ValidationChain = body('branch_name')
      .notEmpty()
      .withMessage('Branch Name Should not be Empty')
      .bail()
      .isString()
      .withMessage('Branch Name should be Alphabetic')
      .isLength({min: 2, max: 50})
      .withMessage('Branch Name should be min 2 max 50 character');
  private _countrySpecificBranchCode: ValidationChain =
    body('country_specific_branch_code')
        .notEmpty()
        .withMessage('Country Specific Branch Code Should not be Empty')
        .bail()
        .isString()
        .withMessage('Country Specific Branch Code Should be String')
        .isLength({min: 2, max: 40})
        .withMessage('Country Specific Branch Code Should be min 2 max 40');
  private _isPrimary: ValidationChain = body('business_bank_detail_is_primary')
      .notEmpty()
      .withMessage('Is Business Bank Account Primary Flag Should not be Empty')
      .bail()
      .isBoolean()
      .withMessage(
          `Is Business Bank Account Primary Flag Should be True or false`);

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
      this._accountHolderName,
      this._accountNumber,
      this._branchName,
      this._countrySpecificBranchCode,
      this._isPrimary,
    ];

  /**
   * @inheritdoc
   * updateValidationChain
   */
  public updateValidationChain:ValidationChain[] =
    [
      param('id').trim(),
      body('account_holder_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Account Holder Name should be Alphabetic')
          .isLength({min: 2, max: 40})
          .withMessage('Account Holder Name Should be min 2 max 40 character'),
      body('account_number')
          .optional({nullable: true})
          .isString()
          .withMessage('Account Number Should be String')
          .isLength({min: 5, max: 20})
          .withMessage('Account Number Should be min 5 max 20'),
      body('branch_name')
          .optional({nullable: true})
          .isString()
          .withMessage('Branch Name should be Alphabetic')
          .isLength({min: 2, max: 50})
          .withMessage('Branch Name should be min 2 max 50 character'),
      body('country_specific_branch_code')
          .optional({nullable: true})
          .isString()
          .withMessage('Country Specific Branch Code Should be String')
          .isLength({min: 2, max: 40})
          .withMessage('Country Specific Branch Code Should be min 2 max 40'),
      body('business_bank_detail_is_primary')
          .optional({nullable: true})
          .isBoolean()
          .withMessage(
              `Is Business Bank Account Primary Flag Should be True or false`),
    ];

  /**
       * paramValidationChain
       */
  public paramValidateChain: ValidationChain[] =
    [
      param('id').trim(),
    ];
}
