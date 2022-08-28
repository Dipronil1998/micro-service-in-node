import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';

/**
 * AdminNoteValidation Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class AdminNoteValidation extends BaseValidator {
  private _noteValidationRule: ValidationChain = body('note')
      .notEmpty()
      .withMessage('Note should not be empty')
      .bail()
      .isString()
      .withMessage('Note should be String')
      .isLength({min: 2, max: 150})
      .withMessage('Note should be minimum 2 and maximum 150 character');
  private _adminIdValidationRule: ValidationChain = body('admin_id')
      .notEmpty()
      .withMessage('AdminId should not be empty')
      .bail()
      .isString()
      .withMessage('AdminId should be String');
  private _ownerIdValidationRule: ValidationChain = body('owner_id')
      .notEmpty()
      .withMessage('OwnerId should not be empty')
      .bail()
      .isString()
      .withMessage('OwnerId should be String');

  /**
   * Constructor Method.
   * @param{string} name
   */
  constructor(name: string) {
    super(name);
  }

  /**
   * @inheritdoc
   * validationChain
   */
  public validationChain: ValidationChain[] = [
    this._noteValidationRule,
    this._adminIdValidationRule,
    this._ownerIdValidationRule,
  ];

  /**
   * paramValidationChain
   */
  public paramValidateChain: ValidationChain[] =
    [
      param('id').trim(),
    ];
}
