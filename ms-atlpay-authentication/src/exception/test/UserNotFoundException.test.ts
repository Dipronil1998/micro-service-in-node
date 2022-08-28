import {httpBadRequestCode}
  from '../../../config/bootstrap';
import {UserNotFoundException}
  from '../UserNotFoundException';

describe('Test cases of User not Found Exception',
    () => {
      test('Test cases of User not Found Exception',
          () => {
            const message: string = 'User not found';
            const exception: UserNotFoundException =
          new UserNotFoundException(message);
            expect(exception instanceof UserNotFoundException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(httpBadRequestCode);
            expect(exception.status).toEqual(400);
          });
    });
