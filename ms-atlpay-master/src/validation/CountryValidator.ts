import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
/**
 * Currency Validator Class
 * @class
 * @extends{BaseValidator}
 */
export class CountryValidator extends BaseValidator {
  private _continentCode: ValidationChain = body('continent_code')
      .trim()
      .notEmpty()
      .withMessage('Country Continent Code Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ''})
      .withMessage('Country Continent Code Should Alphabetic')
      .isLength({min: 2, max: 2})
      .withMessage('Country Continent Code Should min 2 max 2')
      .isUppercase()
      .withMessage('Country Continent Code Should in Upper Case');
  private _iso2: ValidationChain = body('iso_2')
      .trim()
      .notEmpty()
      .withMessage('Country ISO-2 Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ''})
      .withMessage('Country ISO-2 Should Alphabetic')
      .isLength({min: 2, max: 2})
      .withMessage('Country ISO-2 Should min 2 max 2')
      .isUppercase()
      .withMessage('Country ISO-2 Should be in Upper Case');
  private _iso3: ValidationChain = body('iso_3')
      .trim()
      .notEmpty()
      .withMessage('Country ISO-3 Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ''})
      .withMessage('Country ISO-3 Should Alphabetic')
      .isLength({min: 3, max: 3})
      .withMessage('Country ISO-3 Should min 3 max 3')
      .isUppercase()
      .withMessage('Country ISO-3 Should be in Upper Case');
  private _isoNumeric: ValidationChain = body('iso_numeric')
      .trim()
      .notEmpty()
      .withMessage('Country ISO Numeric Should not be Empty')
      .bail()
      .isInt({min: 1, max: 999})
      .withMessage(
          'Country ISO-Numeric Should be Numeric and min 1 max 3 Digit');
  private _fipsCode: ValidationChain = body('fips_code')
      .trim()
      .isAlpha('en-US', {ignore: ''})
      .withMessage('Country Fips Code Should Alphabetic')
      .isLength({min: 2, max: 2})
      .withMessage('Country Fips Code Should min 2 max 2')
      .isUppercase()
      .withMessage('Country Fips Code Should be in Upper Case');
  private _isdCode: ValidationChain = body('isd_code')
      .trim()
      .notEmpty()
      .withMessage('Country ISD Code Should not be Empty')
      .bail()
      .isInt({min: 0, max: 999})
      .withMessage('Country ISD Code Should be Numeric and min 1 max 3 Digit');
  private _commonName: ValidationChain = body('common_name')
      .notEmpty()
      .withMessage('Country Common Name Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Country Common Name Should Alphabetic')
      .isLength({min: 3, max: 30})
      .withMessage('Country Common Name Should min 3 max 30');
  private _officialName: ValidationChain = body('official_name')
      .notEmpty()
      .withMessage('Country Official Name Should not be Empty')
      .bail()
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Country Official Name Should Alphabetic')
      .isLength({min: 3, max: 30})
      .withMessage('Country Official Name Should min 3 max 30');
  private _endonym: ValidationChain = body('endonym')
      .notEmpty()
      .withMessage('Country Endonym Should not be Empty')
      .bail()
      .isString()
      .withMessage('Country Endonym Should be Character')
      .isLength({min: 3, max: 30})
      .withMessage('Country Endonym Should min 3 max 30');
  private _demonym: ValidationChain = body('demonym')
      .isString()
      .withMessage('Country Demonym Should Character')
      .isLength({min: 3, max: 30})
      .withMessage('Country Demonym Should min 3 max 30');
  private _officialCurrencyCode: ValidationChain =
    body('official_currency_code')
        .isString()
        .withMessage('Country official Currency Code Should Alphabetic')
        .isLength({min: 3, max: 3})
        .withMessage('Country official Currency Code Should min 3 max 3')
        .isUppercase()
        .withMessage('Country official Currency Code Should be in Upper Case');

  /**
             * Constructor Method.
             * @param{string} name Name of Validator.
             */
  constructor(name: string) {
    super(name);
  }

  /**
           * validationChain
           * @inheritdoc
           */
  public validationChain: ValidationChain[] =
    [
      this._continentCode,
      this._iso2,
      this._iso3,
      this._isoNumeric,
      this._fipsCode.optional({nullable: true}),
      this._isdCode,
      this._commonName,
      this._officialName,
      this._endonym,
      this._demonym.optional({nullable: true}),
      this._officialCurrencyCode
          .optional({nullable: true}),
    ];

  /**
       * Update Validation Chain
       * @var{ValidationChain[]}
       * @return{ValidationChain[]}
       */
  public updateValidateChain: ValidationChain[] =
    [
      param('iso_numeric')
          .trim()
          .isInt({min: 1, max: 999})
          .withMessage(
              'Country ISO-Numeric Should be Numeric and min 1 max 3 Digit'),
      body('continent_code')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ''})
          .withMessage('Country Continent Code Should Alphabetic')
          .isLength({min: 2, max: 2})
          .withMessage('Country Continent Code Should min 2 max 2')
          .isUppercase()
          .withMessage('Country Continent Code Should in Upper Case'),
      body('iso_2')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ''})
          .withMessage('Country ISO-2 Should Alphabetic')
          .isLength({min: 2, max: 2})
          .withMessage('Country ISO-2 Should min 2 max 2')
          .isUppercase()
          .withMessage('Country ISO-2 Should be in Upper Case'),
      body('iso_3')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ''})
          .withMessage('Country ISO-3 Should Alphabetic')
          .isLength({min: 3, max: 3})
          .withMessage('Country ISO-3 Should min 3 max 3')
          .isUppercase()
          .withMessage('Country ISO-3 Should be in Upper Case'),
      body('fips_code')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ''})
          .withMessage('Country Fips Code Should Alphabetic')
          .isLength({min: 2, max: 2})
          .withMessage('Country Fips Code Should min 2 max 2')
          .isUppercase()
          .withMessage('Country Fips Code Should be in Upper Case'),
      body('isd_code')
          .optional({nullable: true})
          .isInt({min: 0, max: 999})
          .withMessage(
              'Country ISD Code Should be Numeric and min 1 max 3 Digit'),
      body('common_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Country Common Name Should Alphabetic')
          .isLength({min: 3, max: 30})
          .withMessage('Country Common Name Should min 3 max 30'),
      body('official_name')
          .optional({nullable: true})
          .isAlpha('en-US', {ignore: ' '})
          .withMessage('Country Official Name Should Alphabetic')
          .isLength({min: 3, max: 30})
          .withMessage('Country Official Name Should min 3 max 30'),
      body('endonym')
          .optional({nullable: true})
          .isString()
          .withMessage('Country Endonym Should be Character')
          .isLength({min: 3, max: 30})
          .withMessage('Country Endonym Should min 3 max 30'),
      body('demonym')
          .optional({nullable: true})
          .isString()
          .withMessage('Country Demonym Should Character')
          .isLength({min: 3, max: 30})
          .withMessage('Country Demonym Should min 3 max 30'),
    ];

  /**
           * Param Validation Chain
           * @var{ValidationChain[]}
           */
  public paramValidateChain: ValidationChain[] =
    [
      param('iso_numeric')
          .trim()
          .isInt({min: 1, max: 999})
          .withMessage(
              'Country ISO-Numeric Should be Numeric and min 1 max 3 Digit'),
    ];

  /**
     * Block Unblock Validation Chain
     */
  public blockUnblockvalidationChain: ValidationChain[] =
    [
      body('iso_numeric')
          .trim()
          .notEmpty()
          .withMessage('Country ISO Numeric Should not be Empty')
          .bail()
          .isInt({min: 1, max: 999})
          .withMessage(
              'Country ISO-Numeric Should be Numeric and min 1 max 3 Digit'),
      body('block_country')
          .trim()
          .notEmpty()
          .withMessage('Block Country Should not be Empty')
          .bail()
          .isBoolean()
          .withMessage('Block Country Should be True or False'),
    ];
}
