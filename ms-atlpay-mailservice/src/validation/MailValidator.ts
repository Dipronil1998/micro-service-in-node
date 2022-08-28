import {body, ValidationChain} from 'express-validator';
import {BaseValidator} from './BaseValidator';
/**
 * Mailing request Validation Class
 */
export class MailValidator extends BaseValidator {
  /**
   * From rule
   * @var{ValidationChain}
   */
  private _fromRule : ValidationChain = body('from')
      .notEmpty().withMessage('From email Required')
      .isEmail().withMessage('From should be email');
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('Mail Validator');
  }
  /**
   * @inheritdoc
   */
  public validationChain: ValidationChain[] =
    [
      this._fromRule,
    ];
}
