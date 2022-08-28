import {httpBadRequestCode} from '../../../config/bootstrap';
import {InvalidMerchantDocumentPlaceOfIssueException} from
  '../InvalidMerchantDocumentPlaceOfIssueException';

describe(`Test cases of Invalid Merchant Document 
    place of issue Exception`, ()=>{
  test(`Test cases of Invalid Merchant Document 
    place of issue Exception`, ()=>{
    const message: string = 'Invalid Document place of issue';
    const exception: InvalidMerchantDocumentPlaceOfIssueException =
      new InvalidMerchantDocumentPlaceOfIssueException(message);
    expect(exception instanceof
      InvalidMerchantDocumentPlaceOfIssueException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
