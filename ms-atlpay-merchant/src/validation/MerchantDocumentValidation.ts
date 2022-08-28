import {BaseValidator} from './BaseValidator';
import {body, param, ValidationChain} from 'express-validator';
import {InputDocumentException} from '../exception/InputDocumentException';
import {NextFunction, Request, Response} from 'express';
import {InvalidMerchantDocumentIssuerException} from
  '../exception/InvalidMerchantDocumentIssuerException';
import {InvalidMerchantDocumentTypeTextException} from
  '../exception/InvalidMerchantDocumentTypeTextException';
import {InvalidMerchantDateException} from
  '../exception/InvalidMerchantDateException';
import {InvalidMerchantDocumentPlaceOfIssueException} from
  '../exception/InvalidMerchantDocumentPlaceOfIssueException';

/**
 * Merchant Document Validation Class
 * @class
 * @extends{BaseValidator}
 */
export class MerchantDocumentValidation extends BaseValidator {
  /**
   * No Of Documents Validation
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  private _merchantDocumentInformationValidation = async (
      request: Request,
      response: Response,
      next: NextFunction) => {
    try {
      const noOfDocuments: number = Number(request.body.no_of_documents);
      for (let index = 1; index <= noOfDocuments && request.files; index++) {
        if (!(request.files['merchant_document_upload_' + index] &&
          request.body['merchnat_document_title_' + (index)])
        ) {
          throw new InputDocumentException('Document Error');
        }
        this.issuerValidation(
            request.body['merchant_document_issuer_' + (index)]);
        this.documentTypeTextValidation(
            request.body['merchant_document_type_text_' + (index)]);
        this.documentPlaceOfIssueValidation(
            request.body['merchant_document_place_of_issue' + (index)]);
        this.validFromValidation(
            request.body['merchant_document_valid_from_' + (index)]);
        this.validThroughValidation(
            request.body['merchant_document_valid_through_' + (index)]);
      }
    } catch (error) {
      next(error);
    }
  };
  /**
   * Validate Merchant Document Issuer Information
   * @param{string} merchantDocumentIssuer Merchant Document Issuer
   * @return{string} merchantDocumentIssuer
   */
  public issuerValidation = (
      merchantDocumentIssuer: string,
  ): string => {
    try {
      if (merchantDocumentIssuer) {
        if (typeof merchantDocumentIssuer === 'string') {
          if (!(merchantDocumentIssuer.length >= 2 &&
            merchantDocumentIssuer.length <= 50)) {
            throw new InvalidMerchantDocumentIssuerException(
                'Merchant Document Issuer Should be min 2 max 50 character');
          } else {
            return merchantDocumentIssuer;
          }
        } else {
          throw new InvalidMerchantDocumentIssuerException(
              'Merchant Document Issuer Should be String');
        }
      } else {
        return merchantDocumentIssuer;
      }
    } catch (error) {
      throw error;
    }
  };
  /**
   * Document Type Text Validation
   * @param{string} merchantDocumentTypeText
   * @return{string} merchantDocumentTypeText
   */
  public documentTypeTextValidation =
    (merchantDocumentTypeText: string): string => {
      if (merchantDocumentTypeText) {
        if (typeof (merchantDocumentTypeText) === 'string') {
          if (merchantDocumentTypeText.length >= 2 &&
            merchantDocumentTypeText.length <= 50) {
            return merchantDocumentTypeText;
          } else {
            throw new InvalidMerchantDocumentTypeTextException(
                // eslint-disable-next-line
              'Merchant Document Type Text Should be  min 2 max 50 character');
          }
        } else {
          throw new InvalidMerchantDocumentTypeTextException(
              'Merchant Document Type Text Should be String');
        }
      } else {
        return merchantDocumentTypeText;
      }
    };
  /**
   * Document Place of Issue Validation
   * @param{string} merchantDocumentPlaceOfIssue
   * @return{string}
   */
  public documentPlaceOfIssueValidation =
    (merchantDocumentPlaceOfIssue: string): string => {
      if (merchantDocumentPlaceOfIssue) {
        if (
          typeof (merchantDocumentPlaceOfIssue) === 'string') {
          if (
            merchantDocumentPlaceOfIssue.length >= 2 &&
            merchantDocumentPlaceOfIssue.length <= 50) {
            return merchantDocumentPlaceOfIssue;
          } else {
            throw new InvalidMerchantDocumentPlaceOfIssueException(
                // eslint-disable-next-line
              'Merchant Document Place of Issue Should be  min 2 max 50 character');
          }
        } else {
          throw new
          InvalidMerchantDocumentPlaceOfIssueException(
              'Merchant Document Place of Issue Should be String');
        }
      }
      return merchantDocumentPlaceOfIssue;
    };
  /**
   * Valid From Validation
   * @param{string} validFrom
   * @return{Date|string}
   */
  public validFromValidation = (validFrom: string): Date | string => {
    if (validFrom) {
      if (typeof(validFrom) === 'string' &&
        validFrom.match('^[0-9]{4,}-[0-9]{1,2}-[0-9]{1,2}$')) {
        const date: Date = new Date(validFrom);

        if (!isNaN(date.getTime()) && date < new Date()) {
          return date;
        } else {
          throw new InvalidMerchantDateException(
              'Merchant Document Valid From Should be in from YYYY-MM-DD');
        }
      } else {
        throw new InvalidMerchantDateException(
            'Merchant Document Valid From Should be in from YYYY-MM-DD');
      }
    } else {
      return validFrom;
    }
  };
  /**
   * Valid Through Validation
   * @param{string} validThrough
   * @return{Date|string}
   */
  public validThroughValidation = (validThrough: string): Date | string => {
    if (validThrough) {
      if (typeof(validThrough) === 'string' &&
        validThrough.match('^[0-9]{4,}-[0-9]{1,2}-[0-9]{1,2}$')) {
        const date: Date = new Date(validThrough);

        if (!isNaN(date.getTime())) {
          return date;
        } else {
          throw new InvalidMerchantDateException(
              'Merchant Document Valid Through Should be in from YYYY-MM-DD');
        }
      } else {
        throw new InvalidMerchantDateException(
            'Merchant Document Valid Through Should be in from YYYY-MM-DD');
      }
    } else {
      return validThrough;
    }
  };

  private _documentTypeText: ValidationChain = body('document_type_text')
      .isString().withMessage('Document Type Text should be String')
      .isLength({min: 2, max: 50})
      .withMessage('Document Type Text Should be min 2 max 50 character');
  private _noOfDocumentsAndInformation: ValidationChain =
    body('no_of_documents')
        .notEmpty().withMessage('No Of Documents Should not be Empty')
        .bail()
        .isNumeric().withMessage('No Of Documents Should be Numeric')
        .bail()
        .custom(async () => {
          this._merchantDocumentInformationValidation;
        });
  private _issuer: ValidationChain = body('issuer')
      .notEmpty().withMessage('Issuer Should not be Empty')
      .isString().withMessage('Issuer should be String')
      .isLength({min: 2, max: 50})
      .withMessage('Issuer should be min 2 max 50 character');
  private _placeOfIssue: ValidationChain = body('place_of_issue')
      .isString().withMessage('Place Of Issue should be String')
      .isLength({min: 2, max: 100})
      .withMessage('Place Of Issue should be min 2 max 100 character');
  private _validForm: ValidationChain = body('valid_form')
      .notEmpty().withMessage('Date Of ValidForm Should not be Empty')
      .isDate().withMessage('Date Of ValidForm Should be Date')
      .toDate().isISO8601()
      .withMessage('Date Of ValidForm Should be Valid Date');
  private _validThrough: ValidationChain = body('valid_through')
      .notEmpty().withMessage('Date Of ValidThrough Should not be Empty')
      .isDate().withMessage('Date Of ValidThrough Should be Date')
      .toDate().isISO8601()
      .withMessage('Date Of ValidThrough Should be Valid Date');

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
      this._noOfDocumentsAndInformation,
    ];

  /**
    * paramValidationChain
  */
  public paramValidateChain: ValidationChain[] =
    [param('issuer').trim()];
}
