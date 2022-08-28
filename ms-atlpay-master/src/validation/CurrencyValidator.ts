import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
/**
 * Currency Validator Class
 * @class
 * @extends{BaseValidator}
 */
export class CurrencyValidator extends BaseValidator {
  private _iso: ValidationChain = body('iso')
      .notEmpty()
      .withMessage('Currency ISO Should not be empty')
      .bail()
      .isAlpha('en-US', {ignore: ''})
      .withMessage('Currency ISO Should be Alphabetic')
      .isLength({min: 3, max: 3})
      .withMessage('Currency ISO Should be 3 Character')
      .isUppercase()
      .withMessage('Currency ISO Should be in Upper Case');
  private _isoNumeric: ValidationChain = body('iso_numeric')
      .trim()
      .notEmpty()
      .withMessage('Currency ISO-Numeric Should not be empty')
      .bail()
      .isInt({min: 1, max: 999})
      .withMessage(
          'Currency ISO-Numeric Should be Numeric value and min 1 max 3 Digit');
  private _commonName: ValidationChain = body('common_name')
      .notEmpty()
      .withMessage('Currency Common Name Should not be empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Currency Common Name Should be Alphabetic')
      .isLength({min: 1, max: 30})
      .withMessage('Currency Common Name Should be min 1 max 30 Character');
  private _officialName: ValidationChain = body('official_name')
      .notEmpty()
      .withMessage('Currency Official Name Should not be empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Currency Official Name Should be Alphabetic')
      .isLength({min: 1, max: 30})
      .withMessage('Currency Official Name Should be min 1 max 30 Character');
  private _icon: ValidationChain = body('icon')
      .isString()
      .withMessage('Currency Icon Should be string');

  /**
       * Constructor Method.
       * @param{string} name Name of Validator.
       */
  constructor(name: string) {
    super(name);
  }

  /**
     * validation Chain
     * @inheritdoc
     */
  public validationChain: ValidationChain[] =
    [
      this._iso,
      this._isoNumeric,
      this._commonName,
      this._officialName,
      this._icon.optional({nullable: true}),
    ];

  /**
     * Update Validation Chain
     * @var{ValidationChain[]}
     * @return{ ValidationChain[]}
     */
  public updateValidateChain: ValidationChain[] =
    [
      param('iso')
          .trim()
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ''})
          .withMessage('Currency ISO Should be Alphabetic')
          .isLength({min: 3, max: 3})
          .withMessage('Currency ISO Should be 3 Character')
          .isUppercase()
          .withMessage('Currency ISO Should be in Upper Case'),
      body('iso_numeric')
          .optional({nullable: true})
          .isInt({min: 1, max: 999})
          .withMessage(
              `Currency ISO-Numeric Should be Numeric 
                value and min 1 max 3 Digit`),
      body('common_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Currency Common Name Should be Alphabetic')
          .isLength({min: 1, max: 30})
          .withMessage('Currency Common Name Should be min 1 max 30 Character'),
      body('official_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Currency Official Name Should be Alphabetic')
          .isLength({min: 1, max: 30})
          .withMessage(
              'Currency Official Name Should be min 1 max 30 Character'),
      body('icon')
          .optional({nullable: true})
          .isString()
          .withMessage('Currency Icon Should be string'),
    ];

  /**
  * Param Validation Chain
  * @var{ValidationChain[]}
  */
  public paramValidateChain: ValidationChain[] =
    [
      param('iso')
          .trim()
          .isAlpha('en-US', {ignore: ''})
          .withMessage('Currency ISO Should be Alphabetic')
          .isLength({min: 3, max: 3})
          .withMessage('Currency ISO Should be 3 Character')
          .isUppercase()
          .withMessage('Currency ISO Should be in Upper Case'),
    ];
}
