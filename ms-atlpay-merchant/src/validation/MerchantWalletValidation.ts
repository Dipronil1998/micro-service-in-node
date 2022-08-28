import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain}
  from 'express-validator';
import {NumericAndNonZeroException}
  from '../exception/NumericAndNonZeroException';

/**
 * MerchantWallet Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class MerchantWalletValidation extends BaseValidator {
  private _credit: ValidationChain = body('credit')
      .notEmpty()
      .withMessage('Merchant Wallet Credit Should not be Empty')
      .bail()
      .custom((value) => {
        if (!isNaN(value) && value > 0) {
          return Number(value).toFixed(2);
        } else {
          throw new NumericAndNonZeroException(
              'Merchant Wallet Credit should be Numeric and Non-Zero Value');
        }
      });
  private _balance: ValidationChain = body('balance')
      .notEmpty()
      .withMessage('Merchant Wallet Balance Should not be Empty')
      .bail()
      .custom((value) => {
        if (!isNaN(value) && value > 0) {
          return Number(value).toFixed(2);
        } else {
          throw new NumericAndNonZeroException(
              'Merchant Wallet Balance should be Numeric and Non-Zero Value');
        }
      });
  private _remoteBalance: ValidationChain = body('remote_balance')
      .notEmpty()
      .withMessage('Merchant Wallet Remote Balance Should not be Empty')
      .bail()
      .custom((value) => {
        if (!isNaN(value) && value > 0) {
          return Number(value).toFixed(2);
        } else {
          throw new NumericAndNonZeroException(
              // eslint-disable-next-line
              'Merchant Wallet Remote Balance should be Numeric and Non-Zero Value');
        }
      });
  private _recomendedBalance: ValidationChain = body('recomended_balance')
      .notEmpty()
      .withMessage('Merchant Wallet Recomended Balance Should not be Empty')
      .bail()
      .custom((value) => {
        if (!isNaN(value) && value > 0) {
          return Number(value).toFixed(2);
        } else {
          throw new NumericAndNonZeroException(
              // eslint-disable-next-line
              'Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value');
        }
      });
  private _isPrimary: ValidationChain = body('merchant_wallets_is_primary')
      .notEmpty()
      // eslint-disable-next-line
      .withMessage('Merchant Wallet Merchant Wallet isPrimary Flag Should not be Empty')
      .bail()
      .isBoolean()
      .withMessage('Merchant Wallet isPrimary Flag Should be True or False');

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
      this._credit,
      this._balance,
      this._remoteBalance,
      this._recomendedBalance,
      this._isPrimary,
    ];

  /**
     * @inheritdoc
     * updateValidationChanin
     */
  public updateValidationChanin:ValidationChain[] =
    [
      param('id').trim(),
      body('credit')
          .optional({nullable: true})
          .custom((value) => {
            if (!isNaN(value) && value > 0) {
              return Number(value).toFixed(2);
            } else {
              throw new NumericAndNonZeroException(
                  // eslint-disable-next-line
                  'Merchant Wallet Credit should be Numeric and Non-Zero Value');
            }
          }),
      body('balance')
          .optional({nullable: true})
          .custom((value) => {
            if (!isNaN(value) && value > 0) {
              return Number(value).toFixed(2);
            } else {
              throw new NumericAndNonZeroException(
                  // eslint-disable-next-line
                  'Merchant Wallet Balance should be Numeric and Non-Zero Value');
            }
          }),
      body('remote_balance')
          .optional({nullable: true})
          .custom((value) => {
            if (!isNaN(value) && value > 0) {
              return Number(value).toFixed(2);
            } else {
              throw new NumericAndNonZeroException(
              // eslint-disable-next-line
              'Merchant Wallet Remote Balance should be Numeric and Non-Zero Value');
            }
          }),
      body('recomended_balance')
          .optional({nullable: true})
          .custom((value) => {
            if (!isNaN(value) && value > 0) {
              return Number(value).toFixed(2);
            } else {
              throw new NumericAndNonZeroException(
              // eslint-disable-next-line
              'Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value');
            }
          }),
      body('merchant_wallets_is_primary')
          .optional({nullable: true})
          .isBoolean()
          // eslint-disable-next-line
          .withMessage('Merchant Wallet isPrimary Flag Should be True or False'),
    ];

  /**
       * paramValidationChain
       */
  public paramValidateChain: ValidationChain[] =
    [
      param('id').trim(),
    ];
}
