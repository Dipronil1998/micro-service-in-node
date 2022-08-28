import {EmailAlreadyExsistException}
  from '../EmailAlreadyExsistException';

describe('Test cases of Email Already Exsist Exception',
    () => {
      test('Test cases of Email Already Exsist Exception',
          () => {
            const message: string = 'Email Already Exists';
            const exception: EmailAlreadyExsistException =
          new EmailAlreadyExsistException(message);
            expect(exception instanceof EmailAlreadyExsistException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(400);
            expect(exception.status).not.toEqual(404);
          });
    });
