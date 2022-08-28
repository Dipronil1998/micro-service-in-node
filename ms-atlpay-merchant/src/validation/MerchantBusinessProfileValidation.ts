import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
import {InvalidPhoneNumberException}
  from '../exception/InvalidPhoneNumberException';

/**
 * MerchantBusinessProfile Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class MerchantBusinessProfileValidation extends BaseValidator {
  private _businessName: ValidationChain = body('business_name')
      .notEmpty()
      .withMessage('Business Name Should not be Empty')
      .bail()
      .isString()
      .withMessage('Business Name should be Alphabetic')
      .isLength({min: 2, max: 100})
      .withMessage('Business Name Should be min 2 max 100 character');
  private _registrationNumber: ValidationChain = body('registration_number')
      .notEmpty()
      .withMessage('Registration Number Should not be Empty')
      .bail()
      .isString()
      .withMessage('Registration Number should be String')
      .isLength({min: 5, max: 40})
      .withMessage('Registration Number should be min 5 max 40 character');
  private _businessLegalEntityType: ValidationChain =
    body('business_legal_entity_type')
        .isString()
        .withMessage('Business Legal Entity Type Should be String')
        .isLength({min: 2, max: 50})
        .withMessage('Business Legal Entity Type Should be min 2 max 50');
  private _businessRoleText: ValidationChain = body('business_role_text')
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Business Role Text Should be Alphabetic')
      .isLength({min: 2, max: 100})
      .withMessage('Business Role Text Should be min 2 max 100');
  private _businessWebsite: ValidationChain = body('business_website')
      .isURL({protocols: ['https']})
      .withMessage('Business Website Should be URL');
  private _businessAddressLine1: ValidationChain =
    body('merchant_business_profile_business_address_line_1')
        .notEmpty()
        .withMessage('Business Address Line 1 Should not be Empty')
        .bail()
        .isString()
        .withMessage('Business Address Line 1 Should be String')
        .isLength({min: 2, max: 50})
        .withMessage('Business Address Line 1 Should be min 2 max 50');
  private _businessAddressLine2: ValidationChain =
    body('merchant_business_profile_business_address_line_2')
        .isString()
        .withMessage('Business Address Line 2 Should be String')
        .isLength({min: 2, max: 50})
        .withMessage('Business Address Line 2 Should be min 2 max 50');
  private _businessAddressLine3: ValidationChain =
    body('merchant_business_profile_business_address_line_3')
        .isString()
        .withMessage('Business Address Line 3 Should be String')
        .isLength({min: 2, max: 50})
        .withMessage('Business Address Line 3 Should be min 2 max 50');
  private _businessCity: ValidationChain = body('business_city')
      .isString()
      .withMessage('Business City Should be Alphabetic')
      .isLength({min: 2, max: 50})
      .withMessage('Business City Should be min 2 max 50');
  private _businessRegion: ValidationChain = body('business_region')
      .isString()
      .withMessage('Business Region Should be Alphabetic')
      .isLength({min: 2, max: 50})
      .withMessage('Business Region Should be min 2 max 50');
  private _businessPostCode: ValidationChain = body('business_post_code')
      .isString()
      .withMessage('Business Post Code Should be String')
      .isLength({min: 5, max: 15})
      .withMessage('Business Post Code Should be min 5 max 15');
  private _businessPhoneNumber: ValidationChain = body('business_phone_number')
      .notEmpty()
      .withMessage('Business Phone Number Should not be Empty')
      .bail()
      .isInt()
      .withMessage('Business Phone Number Should be Numeric')
      .custom((value)=>{
        if (value == '0000000000') {
          // eslint-disable-next-line
            throw new InvalidPhoneNumberException('Business Phone Number is Invalid');
        } else {
          return true;
        }
      })
      .bail()
      .isLength({min: 10, max: 10})
      .withMessage('Business Phone Number Should be min 10 max 10');
  private _businessEmail: ValidationChain = body('business_email')
      .trim()
      .isEmail()
      .withMessage('Business Email is not Valid');
  private _businessFaxNumber: ValidationChain = body('business_fax_number')
      .isInt()
      .withMessage('Business Fax Number Should be Numeric')
      .bail()
      .custom((value)=>{
        if (value == '0000000000') {
          // eslint-disable-next-line
          throw new InvalidPhoneNumberException('Business Fax Number is Invalid');
        } else {
          return true;
        }
      })
      .bail()
      .isLength({min: 5, max: 15})
      .withMessage('Business Fax Number Should be min 5 max 15');

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
      this._businessName,
      this._registrationNumber,
      this._businessLegalEntityType.optional({nullable: true}),
      this._businessRoleText.optional({nullable: true}),
      this._businessWebsite.optional({nullable: true}),
      this._businessAddressLine1,
      this._businessAddressLine2.optional({nullable: true}),
      this._businessAddressLine3.optional({nullable: true}),
      this._businessCity.optional({nullable: true}),
      this._businessRegion.optional({nullable: true}),
      this._businessPostCode.optional({nullable: true}),
      this._businessPhoneNumber,
      this._businessEmail.optional({nullable: true}),
      this._businessFaxNumber.optional({nullable: true}),
    ];

  /**
     * @inheritdoc
     * updateValidationChain
     */
  public updateValidationChain: ValidationChain[] =
    [
      param('id').trim(),
      body('business_name')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Name should be Alphabetic')
          .isLength({min: 2, max: 100})
          .withMessage('Business Name Should be min 2 max 100 character'),
      body('registration_number')
          .optional({nullable: true})
          .isString()
          .withMessage('Registration Number should be String')
          .isLength({min: 5, max: 40})
          .withMessage('Registration Number should be min 5 max 40 character'),
      body('business_legal_entity_type')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Legal Entity Type Should be String')
          .isLength({min: 2, max: 50})
          .withMessage('Business Legal Entity Type Should be min 2 max 50'),
      body('business_role_text')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Business Role Text Should be Alphabetic')
          .isLength({min: 2, max: 100})
          .withMessage('Business Role Text Should be min 2 max 100'),
      body('business_website')
          .optional({nullable: true})
          .isURL({protocols: ['https']})
          .withMessage('Business Website Should be URL'),
      body('merchant_business_profile_business_address_line_1')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Address Line 1 Should be String')
          .isLength({min: 2, max: 50})
          .withMessage('Business Address Line 1 Should be min 2 max 50'),
      body('merchant_business_profile_business_address_line_2')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Address Line 2 Should be String')
          .isLength({min: 2, max: 50})
          .withMessage('Business Address Line 2 Should be min 2 max 50'),
      body('merchant_business_profile_business_address_line_3')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Address Line 3 Should be String')
          .isLength({min: 2, max: 50})
          .withMessage('Business Address Line 3 Should be min 2 max 50'),
      body('business_city')
          .optional({nullable: true})
          .isString()
          .withMessage('Business City Should be Alphabetic')
          .isLength({min: 2, max: 50})
          .withMessage('Business City Should be min 2 max 50'),
      body('business_region')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Region Should be Alphabetic')
          .isLength({min: 2, max: 50})
          .withMessage('Business Region Should be min 2 max 50'),
      body('business_post_code')
          .optional({nullable: true})
          .isString()
          .withMessage('Business Post Code Should be String')
          .isLength({min: 5, max: 15})
          .withMessage('Business Post Code Should be min 5 max 15'),
      body('business_phone_number')
          .optional({nullable: true})
          .isInt()
          .withMessage('Business Phone Number Should be Numeric')
          .custom((value)=>{
            if (value == '0000000000') {
              // eslint-disable-next-line
            throw new InvalidPhoneNumberException('Business Phone Number is Invalid');
            } else {
              return true;
            }
          })
          .bail()
          .isLength({min: 10, max: 10})
          .withMessage('Business Phone Number Should be min 10 max 10'),
      body('business_email')
          .optional({nullable: true})
          .trim()
          .isEmail()
          .withMessage('Business Email is not Valid'),
      body('business_fax_number')
          .optional({nullable: true})
          .isInt()
          .withMessage('Business Fax Number Should be Numeric')
          .bail()
          .custom((value)=>{
            if (value == '0000000000') {
              // eslint-disable-next-line
          throw new InvalidPhoneNumberException('Business Fax Number is Invalid');
            } else {
              return true;
            }
          })
          .bail()
          .isLength({min: 5, max: 15})
          .withMessage('Business Fax Number Should be min 5 max 15'),
    ];

  /**
         * paramValidationChain
         */
  public paramValidateChain: ValidationChain[] =
    [param('id').trim()];
}
