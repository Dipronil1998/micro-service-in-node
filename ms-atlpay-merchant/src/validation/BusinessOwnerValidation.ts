import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';

/**
 * BusinessOwner Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class BusinessOwnerValidation extends BaseValidator {
  private _firstName: ValidationChain = body('business_owner_first_name')
      .notEmpty()
      .withMessage('Business Owner First Name Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Business Owner First Name Should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Business Owner First Name Should be min 2 max 40');
  private _middleName: ValidationChain = body('business_owner_middle_name')
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Business Owner Middle Name Should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Business Owner Middle Name Should be min 2 max 40');
  private _lastName: ValidationChain = body('business_owner_last_name')
      .notEmpty()
      .withMessage('Business Owner Last Name Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Business Owner Last Name Should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Business Owner Last Name Should be min 2 max 40');
  private _email: ValidationChain = body('business_owner_email')
      .notEmpty()
      .withMessage('Business Owner Email Should not be Empty')
      .bail()
      .trim()
      .isEmail()
      .withMessage('Business Owner Email is not Valid');

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
      this._firstName,
      this._middleName.optional({nullable: true}),
      this._lastName,
      this._email,
    ];

  public updateValidationChain:ValidationChain[] =
    [
      param('id').trim(),
      body('business_owner_first_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Business Owner First Name Should be Alphabetic')
          .isLength({min: 2, max: 40})
          .withMessage('Business Owner First Name Should be min 2 max 40'),
      body('business_owner_middle_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Business Owner Middle Name Should be Alphabetic')
          .isLength({min: 2, max: 40})
          .withMessage('Business Owner Middle Name Should be min 2 max 40'),
      body('business_owner_last_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Business Owner Last Name Should be Alphabetic')
          .isLength({min: 2, max: 40})
          .withMessage('Business Owner Last Name Should be min 2 max 40'),
      body('business_owner_email')
          .optional({nullable: true})
          .trim()
          .isEmail()
          .withMessage('Business Owner Email is not Valid'),
    ];

  /**
       * paramValidationChain
       */
  public paramValidateChain: ValidationChain[] =
    [param('id').trim()];
}
