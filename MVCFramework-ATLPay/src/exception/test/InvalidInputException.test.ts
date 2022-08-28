import {httpBadRequestCode} from '../../../config/bootstrap';
import {InvalidInputException} from '../InvalidInputException';

describe('Test cases of Invalid input Exception', ()=>{
  test('Test cases of Invalid input Exception', ()=>{
    const message: string = 'Invalid input';
    const exception: InvalidInputException = new InvalidInputException(message);
    expect(exception instanceof InvalidInputException).toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(httpBadRequestCode);
    expect(exception.status).toEqual(400);
  });
});
