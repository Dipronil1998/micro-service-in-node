import {httpBadRequestCode}
  from '../../../config/bootstrap';
import {UserNameAlreadyExsistException}
  from '../UserNameAlreadyExsistException';

describe('Test cases of UserName Already Exsist Exception',
    () => {
      test('Test cases of UserName Already Exsist Exception',
          () => {
            const message: string = 'Username Already Exists';
            const exception: UserNameAlreadyExsistException =
          new UserNameAlreadyExsistException(message);
            expect(exception instanceof UserNameAlreadyExsistException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(httpBadRequestCode);
            expect(exception.status).toEqual(400);
          });
    });
