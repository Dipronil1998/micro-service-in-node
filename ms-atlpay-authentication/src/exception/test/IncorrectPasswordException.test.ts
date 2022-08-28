import {IncorrectPasswordException}
  from '../IncorrectPasswordException';

describe('Test cases of Incorrect Password Exception',
    () => {
      test('Test cases of Incorrect Password Exception',
          () => {
            const message: string = 'Incorrect Password';
            const exception: IncorrectPasswordException =
          new IncorrectPasswordException(message);
            expect(exception instanceof IncorrectPasswordException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(400);
            expect(exception.status).not.toEqual(404);
          });
    });
