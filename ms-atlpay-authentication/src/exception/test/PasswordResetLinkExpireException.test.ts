import {httpBadRequestCode}
  from '../../../config/bootstrap';
import {PasswordResetLinkExpireException}
  from '../PasswordResetLinkExpireException';

describe('Test cases of Password Reset Link Expire Exception',
    () => {
      test('Test cases of Password Reset Link Expire Exception',
          () => {
            const message: string = 'This password reset link has expired';
            const exception: PasswordResetLinkExpireException =
          new PasswordResetLinkExpireException(message);
            expect(exception instanceof PasswordResetLinkExpireException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(httpBadRequestCode);
            expect(exception.status).toEqual(400);
          });
    });
