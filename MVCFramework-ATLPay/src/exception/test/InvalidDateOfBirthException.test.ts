import {httpBadRequestCode} from '../../../config/bootstrap';
import {InvalidDateOfBirthException} from '../InvalidDateOfBirthException';

describe('Test cases of Invalid DOB Exception', ()=>{
  test('Test cases of Invalid DOB Exception', ()=>{
    const message: string = 'Invalid DOB';
    const exception: InvalidDateOfBirthException =
      new InvalidDateOfBirthException(message);
    expect(exception instanceof InvalidDateOfBirthException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
