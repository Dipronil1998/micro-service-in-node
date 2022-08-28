import {CurrentAndNewPasswordMatchException}
  from '../CurrentAndNewPasswordMatchException';

describe('Test cases of Current And New Password Match Exception',
    () => {
      test('Test cases of Current And New Password Match Exception',
          () => {
            const message: string =
              'Current and New Password Should Not be Same';
            const exception: CurrentAndNewPasswordMatchException =
          new CurrentAndNewPasswordMatchException(message);
            expect(exception instanceof CurrentAndNewPasswordMatchException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(400);
          });
    });
