import {httpBadRequestCode} from '../../../config/bootstrap';
import {InvalidMerchantDocumentTypeTextException} from
  '../InvalidMerchantDocumentTypeTextException';

describe('Test cases of Invalid Merchant Document type Exception', ()=>{
  test('Test cases of Invalid Merchant Document type Exception', ()=>{
    const message: string = 'Invalid Document type';
    const exception: InvalidMerchantDocumentTypeTextException =
      new InvalidMerchantDocumentTypeTextException(message);
    expect(exception instanceof InvalidMerchantDocumentTypeTextException)
        .toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
