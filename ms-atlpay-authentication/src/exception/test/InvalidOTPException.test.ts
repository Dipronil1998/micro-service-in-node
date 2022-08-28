import {httpBadRequestCode}
  from '../../../config/bootstrap';
import {InvalidOTPException}
  from '../InvalidOTPException';

describe('Test cases of Invalid OTP Exception',
    () => {
      test('Test cases of Invalid OTP Exception',
          () => {
            const message: string = 'Invalid OTP';
            const exception: InvalidOTPException =
          new InvalidOTPException(message);
            expect(exception instanceof InvalidOTPException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(httpBadRequestCode);
            expect(exception.status).toEqual(400);
          });
    });
