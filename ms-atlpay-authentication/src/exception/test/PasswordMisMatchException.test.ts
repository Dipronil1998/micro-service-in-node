import {PasswordMisMatchException}
  from '../PasswordMisMatchException';

describe('Test cases of Password MisMatch Exception',
    () => {
      test('Test cases of Password MisMatch Exception',
          () => {
            const message: string =
              'Password and Confirm Password Does Not Matched';
            const exception: PasswordMisMatchException =
          new PasswordMisMatchException(message);
            expect(exception instanceof PasswordMisMatchException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(400);
            expect(exception.status).not.toEqual(404);
          });
    });
