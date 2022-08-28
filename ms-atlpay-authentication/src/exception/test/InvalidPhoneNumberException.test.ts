import {httpBadRequestCode}
  from '../../../config/bootstrap';
import {InvalidPhoneNumberException}
  from '../InvalidPhoneNumberException';

describe('Test cases of Invald phone number Exception',
    () => {
      test('Test cases of Invald phone number Exception',
          () => {
            const message: string = ' Invald phone number';
            const exception: InvalidPhoneNumberException =
          new InvalidPhoneNumberException(message);
            expect(exception instanceof InvalidPhoneNumberException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(httpBadRequestCode);
            expect(exception.status).toEqual(400);
          });
    });
