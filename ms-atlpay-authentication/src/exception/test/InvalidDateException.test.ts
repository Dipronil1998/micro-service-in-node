import {httpBadRequestCode}
  from '../../../config/bootstrap';
import {InvalidDateException}
  from '../InvalidDateException';

describe('Test cases of InvalidDateException.',
    () => {
      test('Test cases of Invalid Date Exception',
          () => {
            const message: string = 'Invalid Date';
            const exception: InvalidDateException =
          new InvalidDateException(message);
            expect(exception instanceof InvalidDateException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(httpBadRequestCode);
            expect(exception.status).toEqual(400);
          });
    });
