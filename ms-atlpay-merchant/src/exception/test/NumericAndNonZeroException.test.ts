import {httpBadRequestCode} from '../../../config/bootstrap';
import {NumericAndNonZeroException} from '../NumericAndNonZeroException';

describe('Test cases of Numberic and non zero Exception', ()=>{
  test('Test cases of Numberic and non zero Exception', ()=>{
    const message: string = ' Invald phone number';
    const exception: NumericAndNonZeroException =
      new NumericAndNonZeroException(message);
    expect(exception instanceof NumericAndNonZeroException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
