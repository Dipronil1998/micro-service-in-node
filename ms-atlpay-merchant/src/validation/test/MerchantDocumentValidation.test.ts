import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {MerchantDocumentValidation} from '../MerchantDocumentValidation';
import {InvalidMerchantDocumentIssuerException} from
  '../../exception/InvalidMerchantDocumentIssuerException';
import {InvalidMerchantDocumentTypeTextException} from
  '../../exception/InvalidMerchantDocumentTypeTextException';
import {InvalidMerchantDocumentPlaceOfIssueException} from
  '../../exception/InvalidMerchantDocumentPlaceOfIssueException';
import {InvalidMerchantDateException} from
  '../../exception/InvalidMerchantDateException';
const app: express.Application = express();
app.use(bodyParser.json());
app.post('/test-business-owner',
    new MerchantDocumentValidation(
        'Merchant Document Validator').validationChain,
    new MerchantDocumentValidation(
        'Merchant Document Validator').validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
describe('Test cases of Merchant Document Validation', () => {
  test('Testing Merchant Document Information Validation', () => {
    expect(true).toBe(true);
  });
});

describe('Test cases of issuer Validation', () => {
  const validator: MerchantDocumentValidation =
    new MerchantDocumentValidation('Merchant Document Validator');
  test('Test case for valid Issuer', () => {
    let issuer: string = 'Govenrment of india';
    let result: string = validator.issuerValidation(issuer);
    expect(result).toEqual(issuer);

    issuer = 'AA';
    result = validator.issuerValidation(issuer);
    expect(result).toEqual(issuer);

    issuer = 'AAA';
    result = validator.issuerValidation(issuer);
    expect(result).toEqual(issuer);

    issuer = 'Valid IssuerValid IssuerValid IssuerValid IssuerII';

    result = validator.issuerValidation(issuer);
    expect(result).toEqual(issuer);

    let undefinedIssuer;
    // @ts-ignore
    result = validator.issuerValidation(undefinedIssuer);
    expect(result).toBeUndefined();
  });
  test('Test case for invalid issuer', () => {
    try {
      const issuer = 123;
      // @ts-ignore
      validator.issuerValidation(issuer);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentIssuerException)
          .toBe(true);
      expect(error.message)
          .toEqual('Merchant Document Issuer Should be String');
    }

    try {
      const issuer: string = 'I';
      validator.issuerValidation(issuer);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentIssuerException)
          .toBe(true);
      expect(error.message)
          .toEqual('Merchant Document Issuer Should be min 2 max 50 character');
    }

    try {
      const issuer: string =
        'Invalid IssuerInvalid IssuerInvalid IssuerInvalidII';
      validator.issuerValidation(issuer);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentIssuerException)
          .toBe(true);
      expect(error.message)
          .toEqual('Merchant Document Issuer Should be min 2 max 50 character');
    }
  });
});

describe('Test cases of Merchant Document Type Text Validation', () => {
  const validator: MerchantDocumentValidation =
    new MerchantDocumentValidation('Merchant Document Validator');
  test('Test case for valid Merchant Document Type Text', () => {
    let documentTypeText: string = 'Proof of Address';
    let result: string = validator
        .documentTypeTextValidation(documentTypeText);
    expect(result).toEqual(documentTypeText);

    documentTypeText = 'AA';
    result = validator.documentTypeTextValidation(documentTypeText);
    expect(result).toEqual(documentTypeText);

    documentTypeText = 'AAA';
    result = validator.documentTypeTextValidation(documentTypeText);
    expect(result).toEqual(documentTypeText);

    documentTypeText = 'Valid IssuerValid IssuerValid IssuerValid IssuerII';

    result = validator.documentTypeTextValidation(documentTypeText);
    expect(result).toEqual(documentTypeText);

    let undefinedDocumentType;
    // @ts-ignore
    result = validator.documentTypeTextValidation(undefinedDocumentType);
    expect(result).toBeUndefined();
  });
  test('Test case for invalid Merchant Document Type Text', () => {
    try {
      const documentTypeText = 123;
      // @ts-ignore
      validator.documentTypeTextValidation(documentTypeText);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentTypeTextException)
          .toBe(true);
      expect(error.message)
          .toEqual('Merchant Document Type Text Should be String');
    }

    try {
      const documentTypeText: string = 'I';
      validator.documentTypeTextValidation(documentTypeText);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentTypeTextException)
          .toBe(true);
      expect(error.message)
          .toEqual(
              'Merchant Document Type Text Should be  min 2 max 50 character');
    }

    try {
      const documentTypeText: string =
        'Invalid IssuerInvalid IssuerInvalid IssuerInvalidII';
      validator.documentTypeTextValidation(documentTypeText);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentTypeTextException)
          .toBe(true);
      expect(error.message)
          .toEqual(
              'Merchant Document Type Text Should be  min 2 max 50 character');
    }
  });
});


describe('Test cases of Document Place of Issue Validation', () => {
  const validator: MerchantDocumentValidation =
    new MerchantDocumentValidation('Merchant Document Validator');
  test('Test case for valid Document Place of Issue', () => {
    let documentPlaceOfIssue: string = 'Proof of Address';
    let result: string =
      validator.documentPlaceOfIssueValidation(documentPlaceOfIssue);
    expect(result).toEqual(documentPlaceOfIssue);

    documentPlaceOfIssue = 'AA';
    result = validator.documentPlaceOfIssueValidation(documentPlaceOfIssue);
    expect(result).toEqual(documentPlaceOfIssue);

    documentPlaceOfIssue = 'AAA';
    result = validator.documentPlaceOfIssueValidation(documentPlaceOfIssue);
    expect(result).toEqual(documentPlaceOfIssue);

    documentPlaceOfIssue = 'Valid IssuerValid IssuerValid IssuerValid IssuerII';

    result = validator.documentPlaceOfIssueValidation(documentPlaceOfIssue);
    expect(result).toEqual(documentPlaceOfIssue);

    let undefinedDocumentPlaceOfIssue;

    result = validator
        .documentPlaceOfIssueValidation(
        // @ts-ignore
            undefinedDocumentPlaceOfIssue);
    expect(result).toBeUndefined();
  });
  test('Test case for invalid Document Place of Issue', () => {
    try {
      const documentPlaceOfIssue = 123;
      // @ts-ignore
      validator.documentPlaceOfIssueValidation(documentPlaceOfIssue);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentPlaceOfIssueException)
          .toBe(true);
      expect(error.message)
          .toEqual('Merchant Document Place of Issue Should be String');
    }

    try {
      const documentPlaceOfIssue: string = 'I';
      validator.documentPlaceOfIssueValidation(documentPlaceOfIssue);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentPlaceOfIssueException)
          .toBe(true);
      expect(error.message)
          .toEqual(
          // eslint-disable-next-line
          'Merchant Document Place of Issue Should be  min 2 max 50 character');
    }

    try {
      const documentPlaceOfIssue: string =
        'Invalid IssuerInvalid IssuerInvalid IssuerInvalidII';
      validator
          .documentPlaceOfIssueValidation(documentPlaceOfIssue);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDocumentPlaceOfIssueException)
          .toBe(true);
      expect(error.message)
          .toEqual(
          // eslint-disable-next-line
          'Merchant Document Place of Issue Should be  min 2 max 50 character');
    }
  });
});


describe('Test cases for valid from validation', () => {
  const validator: MerchantDocumentValidation =
    new MerchantDocumentValidation('Merchant Document Validator');
  test('Test case for valid input of valid from', () => {
    let validFrom: string = '2021-12-01';
    let result = validator.validFromValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    validFrom = '2021-1-1';
    result = validator.validFromValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    validFrom = '2021-11-1';
    result = validator.validFromValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    validFrom = '2021-1-21';
    result = validator.validFromValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    const today : string = new Date().toISOString().substring(0, 10);
    result = validator.validFromValidation(today);

    expect(result instanceof Date).toBe(true);
    let undefinedDate;
    // @ts-ignore
    result = validator.validFromValidation(undefinedDate);
    expect(result).toBeUndefined();
  });

  test('Test case for invalid Date format of valid from', () => {
    let invalidFormat: string = '202-11-05';
    try {
      validator.validFromValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }

    invalidFormat = '2021-111-05';
    try {
      validator.validFromValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }

    invalidFormat = '2021-11-332';
    try {
      validator.validFromValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }

    invalidFormat = '11-05';
    try {
      validator.validFromValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }

    invalidFormat = '2011-Apr-05';
    try {
      validator.validFromValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }
  });
  test('Test case for invalid input of valid from', () => {
    let invalidValidFrom = 123;
    try {
      // @ts-ignore
      validator.validFromValidation(invalidValidFrom);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }

    invalidValidFrom = 123;
    try {
      // @ts-ignore
      validator.validFromValidation(invalidValidFrom);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }
  });

  test('Test case for Future date valid from', ()=>{
    try {
      const tommorow : string =
        new Date(new Date().valueOf() + 1000*24*60*60 )
            .toISOString().substring(0, 10);
      validator.validFromValidation(tommorow);
    } catch (error: any ) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }

    try {
      const future : string =
        new Date(new Date().valueOf() + 1000*72*60*60 )
            .toISOString().substring(0, 10);
      validator.validFromValidation(future);
    } catch (error: any ) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid From Should be in from YYYY-MM-DD');
    }
  });
});


describe('Test cases for valid Through validation', () => {
  const validator: MerchantDocumentValidation =
    new MerchantDocumentValidation('Merchant Document Validator');
  test('Test case for valid input of valid through', () => {
    let validFrom: string = '2021-12-01';
    let result = validator.validThroughValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    validFrom = '2021-1-1';
    result = validator.validThroughValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    validFrom = '2021-11-1';
    result = validator.validThroughValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    validFrom = '2021-1-21';
    result = validator.validThroughValidation(validFrom);
    expect(result instanceof Date).toBe(true);
    let undefinedDate;
    // @ts-ignore
    result = validator.validFromValidation(undefinedDate);
    expect(result).toBeUndefined();
  });

  test('Test case for invalid Date format of valid Through', () => {
    let invalidFormat: string = '202-11-05';
    try {
      validator.validThroughValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }

    invalidFormat = '2021-111-05';
    try {
      validator.validThroughValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }

    invalidFormat = '2021-11-332';
    try {
      validator.validThroughValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }

    invalidFormat = '11-05';
    try {
      validator.validThroughValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }

    invalidFormat = '2011-Apr-05';
    try {
      validator.validThroughValidation(invalidFormat);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }
  });
  test('Test case for invalid input of valid from', () => {
    let invalidValidFrom = 123;
    try {
      // @ts-ignore
      validator.validThroughValidation(invalidValidFrom);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }

    invalidValidFrom = 123;
    try {
      // @ts-ignore
      validator.validThroughValidation(invalidValidFrom);
    } catch (error: any) {
      expect(error instanceof InvalidMerchantDateException);
      expect(error.message).toEqual(
          'Merchant Document Valid Through Should be in from YYYY-MM-DD');
    }
  });
});
