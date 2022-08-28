import {EmailAndRecoveryEmailMatchException}
  from '../EmailAndRecoveryEmailMatchException';

describe('Test cases of Email Recovery Email Match Exception',
    () => {
      test('Test cases of Email Recovery Email Match Exception',
          () => {
            const message: string =
              'Email and Recovery Email Should Not be Same';
            const exception: EmailAndRecoveryEmailMatchException =
          new EmailAndRecoveryEmailMatchException(message);
            expect(exception instanceof EmailAndRecoveryEmailMatchException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(400);
          });
    });
