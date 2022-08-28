import {httpBadRequestCode} from '../../../config/bootstrap';
import {InvalidMerchantDateException} from '../InvalidMerchantDateException';

describe('Test cases of Invalid Merchant Exception', ()=>{
  test('Test cases of Invalid Merchant Exception', ()=>{
    const message: string = 'Invalid input';
    const exception: InvalidMerchantDateException =
      new InvalidMerchantDateException(message);
    expect(exception instanceof InvalidMerchantDateException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
