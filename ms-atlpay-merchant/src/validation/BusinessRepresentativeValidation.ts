import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
import {InvalidPhoneNumberException} from
  '../exception/InvalidPhoneNumberException';
import {InvalidDateOfBirthException} from
  '../exception/InvalidDateOfBirthException';

/**
 * MerchantBusinessProfile Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class BusinessRepresentativeValidation extends BaseValidator {
  private _firstName: ValidationChain =
    body('business_representative_first_name')
        .notEmpty()
        .withMessage('Business Representative First Name Should not be Empty')
        .bail()
        .isAlpha('en-US', {ignore: '\s'})
        .withMessage('Business Representative First Name should be Alphabetic')
        .isLength({min: 2, max: 40})
        // eslint-disable-next-line
        .withMessage('Business Representative First Name Should be min 2 max 40 character');
  private _middleName: ValidationChain =
    body('business_representative_middle_name')
        .isAlpha('en-US', {ignore: '\s'})
        .withMessage('Business Representative Middle Name should be Alphabetic')
        .isLength({min: 2, max: 40})
        .withMessage(
            // eslint-disable-next-line
            'Business Representative Middle Name should be min 2 max 40 character');
  private _lastName: ValidationChain = body('business_representative_last_name')
      .notEmpty()
      .withMessage('Business Representative Last Name Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: '\s'})
      .withMessage('Business Representative Last Name Should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Business Representative Last Name Should be min 2 max 40');
  private _email: ValidationChain = body('business_representative_email')
      .notEmpty()
      .withMessage('Business Representative Email Should not be Empty')
      .bail()
      .trim()
      .isEmail()
      .withMessage('Email is not Valid');
  private _jobTitle: ValidationChain = body('business_representative_job_title')
      .notEmpty()
      .withMessage('Business Representative Job Title Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: '\s'})
      .withMessage('Business Representative Job Title Should be Alphabetic')
      .isLength({min: 2, max: 40})
      .withMessage('Business Representative Job Title Should be min 2 max 40');
  private _dateOfBirth: ValidationChain =
    body('business_representative_date_of_birth').trim()
        .notEmpty()
        // eslint-disable-next-line
        .withMessage('Business Representative Date Of Birth Should not be Empty')
        .bail()
        .isDate({format: 'YYYY-MM-DD'})
        .withMessage(
            // eslint-disable-next-line
            'Business Representative Date Of Birth Should be in YYYY-MM-DD format')
        .custom((value)=>{
          const enteredDate: Date = new Date(value);
          const todaysDate : Date = new Date();
          if (enteredDate>todaysDate) {
            throw new InvalidDateOfBirthException(
                // eslint-disable-next-line
                'Business Representative Date Of Birth Should be Before Current Date');
          }
          return true;
        });
  private _businessAddressLine1: ValidationChain =
    body('business_representative_business_address_line_1')
        .notEmpty()
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line1 Should not be Empty')
        .bail()
        .isString()
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line1 Should be Alphabetic')
        .isLength({min: 2, max: 100})
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line1 Should be min 2 max 100');
  private _businessAddressLine2: ValidationChain =
    body('business_representative_business_address_line_2')
        .isString()
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line2 Should be Alphabetic')
        .isLength({min: 2, max: 50})
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line2 Should be min 2 max 100');
  private _businessAddressLine3: ValidationChain =
    body('business_representative_business_address_line_3')
        .isString()
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line3 Should be Alphabetic')
        .isLength({min: 2, max: 50})
        // eslint-disable-next-line
        .withMessage('Business Representative Business Address Line3 Should be min 2 max 100');
  private _phoneNumber: ValidationChain =
    body('business_representative_phone_number')
        .notEmpty()
        .withMessage('Business Representative Phone Number Should not be Empty')
        .bail()
        .isInt()
        // eslint-disable-next-line
        .withMessage('Business Representative Phone Number is Invalid')
        .custom((value)=>{
          if (value == '0000000000') {
            // eslint-disable-next-line
            throw new InvalidPhoneNumberException('Business Representative Phone Number is Invalid');
          } else {
            return true;
          }
        })
        .isLength({min: 10, max: 10})
        .withMessage('Business Representative Phone Number is Invalid');

  /**
         * Constructor Method.
         * @param{string} name Name of Validator.
        */
  constructor(name: string) {
    super(name);
  }

  /**
   * @inheritdoc
   * @var{ValidationChain[]}
   */
  public validationChain: ValidationChain[] =
    [
      this._firstName,
      this._middleName.optional({nullable: true}),
      this._lastName,
      this._email,
      this._jobTitle,
      this._dateOfBirth,
      this._businessAddressLine1,
      this._businessAddressLine2.optional({nullable: true}),
      this._businessAddressLine3.optional({nullable: true}),
      this._phoneNumber,
    ];

  public updateValidationChain: ValidationChain[] =
    [
      param('email').trim(),
      body('business_representative_first_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          // eslint-disable-next-line
          .withMessage('Business Representative First Name should be Alphabetic')
          .isLength({min: 2, max: 40})
          // eslint-disable-next-line
          .withMessage('Business Representative First Name Should be min 2 max 40 character'),
      body('business_representative_middle_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          // eslint-disable-next-line
          .withMessage('Business Representative Middle Name should be Alphabetic')
          .isLength({min: 2, max: 40})
          .withMessage(
              // eslint-disable-next-line
            'Business Representative Middle Name should be min 2 max 40 character'),
      body('business_representative_last_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          // eslint-disable-next-line
          .withMessage('Business Representative Last Name Should be Alphabetic')
          .isLength({min: 2, max: 40})
          // eslint-disable-next-line
          .withMessage('Business Representative Last Name Should be min 2 max 40'),
      body('business_representative_email')
          .optional({nullable: true})
          .trim()
          .isEmail()
          .withMessage('Email is not Valid'),
      body('business_representative_job_title')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          // eslint-disable-next-line
          .withMessage('Business Representative Job Title Should be Alphabetic')
          .isLength({min: 2, max: 40})
          // eslint-disable-next-line
          .withMessage('Business Representative Job Title Should be min 2 max 40'),
      body('business_representative_date_of_birth').trim()
          .optional({nullable: true})
          .isDate({format: 'YYYY-MM-DD'})
          .withMessage(
              // eslint-disable-next-line
              'Business Representative Date Of Birth Should be in YYYY-MM-DD format')
          .custom((value)=>{
            const enteredDate: Date = new Date(value);
            const todaysDate : Date = new Date();
            if (enteredDate>todaysDate) {
              throw new InvalidDateOfBirthException(
                  // eslint-disable-next-line
                  'Business Representative Date Of Birth Should be Before Current Date');
            }
            return true;
          }),
      body('business_representative_business_address_line_1')
          .optional({nullable: true})
          .isString()
          // eslint-disable-next-line
          .withMessage('Business Representative Business Address Line1 Should be Alphabetic')
          .isLength({min: 2, max: 100})
          // eslint-disable-next-line
          .withMessage('Business Representative Business Address Line1 Should be min 2 max 100'),
      body('business_representative_business_address_line_2')
          .optional({nullable: true})
          .isString()
          // eslint-disable-next-line
          .withMessage('Business Representative Business Address Line2 Should be Alphabetic')
          .isLength({min: 2, max: 50})
          // eslint-disable-next-line
          .withMessage('Business Representative Business Address Line2 Should be min 2 max 100'),
      body('business_representative_business_address_line_3')
          .optional({nullable: true})
          .isString()
          // eslint-disable-next-line
          .withMessage('Business Representative Business Address Line3 Should be Alphabetic')
          .isLength({min: 2, max: 50})
          // eslint-disable-next-line
          .withMessage('Business Representative Business Address Line3 Should be min 2 max 100'),
      body('business_representative_phone_number')
          .optional({nullable: true})
          .isInt()
          // eslint-disable-next-line
          .withMessage('Business Representative Phone Number is Invalid')
          .custom((value)=>{
            if (value == '0000000000') {
            // eslint-disable-next-line
            throw new InvalidPhoneNumberException('Business Representative Phone Number is Invalid');
            } else {
              return true;
            }
          })
          .isLength({min: 10, max: 10})
          .withMessage('Business Representative Phone Number is Invalid'),
    ];
  /**
   * paramValidationChain
   * @var{ValidationChain[]}
   */
  public paramValidateChain: ValidationChain[] =
    [param('email').trim()];
}
