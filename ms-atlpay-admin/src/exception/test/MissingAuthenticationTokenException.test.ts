import {MissingAuthenticationTokenException}
  from '../MissingAuthenticationTokenException';

describe('Test cases of Missing Authentication Token Exception',
    () => {
      test('Test cases of Missing Authentication Token Exception',
          () => {
            const message: string = 'Missing Authentication Token';
            const exception: MissingAuthenticationTokenException =
          new MissingAuthenticationTokenException(message);
            expect(exception instanceof MissingAuthenticationTokenException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(403);
            expect(exception.status).not.toEqual(404);
          });
    });
