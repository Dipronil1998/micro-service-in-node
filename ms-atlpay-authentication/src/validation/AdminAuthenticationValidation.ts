import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
import {PasswordMisMatchException}
  from '../exception/PasswordMisMatchException';
import {passwordConfirmPasswordMismatchError} from '../../config/bootstrap';
import {InvalidDateException} from '../exception/InvalidDateException';

/**
 * AdminAuthentication Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class AdminAuthenticationValidation extends BaseValidator {
  private _firstNameValidationRule: ValidationChain = body('first_name')
      .notEmpty()
      .withMessage('First name should not be empty')
      .bail()
      .isAlpha('en-US', {ignore: '\s'})
      .withMessage('First name should be alphabetic')
      .isLength({min: 2, max: 30})
      .withMessage('First name should be minimum 2 and maximum 30 character');
  private _middleNameValidationRule: ValidationChain = body('middle_name')
      .isAlpha('en-US', {ignore: '\s'})
      .withMessage('Middle name should be alphabetic')
      .isLength({min: 2, max: 30})
      .withMessage('Middle name should be minimum 2 and maximum 30 character');
  private _lastNameValidationRule: ValidationChain = body('last_name')
      .notEmpty()
      .withMessage('Last name should not be empty')
      .bail()
      .isAlpha('en-US', {ignore: '\s'})
      .withMessage('Last name should be alphabetic')
      .isLength({min: 2, max: 30})
      .withMessage('Last name should be minimum 2 and maximum 30 character');
  private _emailValidationRule: ValidationChain = body('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .bail()
      .isEmail()
      .withMessage('Email is not valid');


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
      this._firstNameValidationRule,
      this._middleNameValidationRule.optional({nullable: true}),
      this._lastNameValidationRule,
      this._emailValidationRule,
    ];

  /**
      * loginValidationChain
      */
  public loginValidationChain: ValidationChain[] =
    [
      this._emailValidationRule,
      body('password')
          .trim()
          .notEmpty()
          .withMessage('Password should not be empty'),
    ];

  /**
       * @inheritdoc
       * validationChain
      */
  public updateValidationChain = [
    param('id')
        .trim(),
    body('first_name')
        .optional({nullable: true})
        .isAlpha('en-US', {ignore: ' '})
        .withMessage('First name should be alphabetic')
        .isLength({min: 2, max: 30})
        .withMessage('First name should be min 2 max 30 character'),
    body('middle_name')
        .optional({nullable: true})
        .isAlpha('en-US', {ignore: ' '})
        .withMessage('Middle name should be alphabetic')
        .isLength({min: 2, max: 30})
        .withMessage('Middle name should be min 2 max 30 character'),
    body('last_name')
        .optional({nullable: true})
        .isAlpha('en-US', {ignore: ' '})
        .withMessage('Last name should be alphabetic')
        .isLength({min: 2, max: 30})
        .withMessage('Last name should be min 2 max 30 character'),

  ];

  /**
   * validationChain
  */
  public updatePasswordValidationChain = [
    param('id').trim(),
    body('new_password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty')
        .bail()
    // eslint-disable-next-line
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)
        .withMessage(
            'Password should be a alphanumeric and spcial character value'),
    body('confirm_password')
        .trim()
        .custom(async (confirmPassword: string, {req}: any) => {
          const password = await (req.body.new_password);
          if (password !== confirmPassword) {
            throw new
            PasswordMisMatchException(passwordConfirmPasswordMismatchError);
          }
        }),
  ];

  /**
    * paramValidationChain
    */
  public paramValidateChain: ValidationChain[] =
    [
      param('id')
          .trim(),
    ];

  /**
  * Email Validation Chain
  */
  public emailValidateChain: ValidationChain[] =
    [
      body('email')
          .trim()
          .notEmpty()
          .withMessage('Email should not be empty')
          .bail()
          .isEmail()
          .withMessage('Email is not valid'),
    ];

  /**
     * Check Email Exists ValidatationChain in param.
     */
  public checkEmailExistsValidatationChain = [
    param('email').trim()
        .notEmpty()
        .withMessage('Email should not be empty')
        .bail()
        .isEmail()
        .withMessage('Email is not valid'),
  ];

  /**
   * block Until Date Validation Chain
   */
  public blockUntilValidationChain = [
    body('block_until').trim()
        .notEmpty()
        .withMessage('block until Date should not be empty')
        .bail()
        .isDate({format: 'YYYY-MM-DD'})
        .withMessage(
            'Block until date should be in YYYY-MM-DD format')
        .bail()
        .custom((value) => {
          const enteredDate: Date = new Date(value);
          const todaysDate: Date = new Date();
          if (enteredDate < todaysDate) {
            throw new InvalidDateException(
                'Block until date should be after Current Date');
          }
          return true;
        }),
  ];
}
