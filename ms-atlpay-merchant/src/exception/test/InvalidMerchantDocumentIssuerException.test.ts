import {httpBadRequestCode} from '../../../config/bootstrap';
import {InvalidMerchantDocumentIssuerException} from
  '../InvalidMerchantDocumentIssuerException';

describe('Test cases of Invalid Merchant Document issuer Exception', ()=>{
  test('Test cases of Invalid Merchant Document issuer Exception', ()=>{
    const message: string = 'Invalid input';
    const exception: InvalidMerchantDocumentIssuerException =
      new InvalidMerchantDocumentIssuerException(message);
    expect(exception instanceof InvalidMerchantDocumentIssuerException)
        .toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
