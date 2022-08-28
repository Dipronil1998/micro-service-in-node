import {UserBlockException}
  from '../UserBlockException';

describe('Test cases of User Block Exception',
    () => {
      test('Test cases of User Block Exception',
          () => {
            const message: string = 'The Account is Temporarily Blocked';
            const exception: UserBlockException =
          new UserBlockException(message);
            expect(exception instanceof UserBlockException).toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(400);
            expect(exception.status).not.toEqual(404);
          });
    });
