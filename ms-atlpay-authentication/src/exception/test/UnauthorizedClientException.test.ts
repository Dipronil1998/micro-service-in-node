import {UnauthorizedClientException}
  from '../UnauthorizedClientException';

describe('Test cases of Unauthorized Client Exception',
    () => {
      test('Test cases of Unauthorized Client Exception',
          () => {
            const message: string = 'Unauthorized Client';
            const exception: UnauthorizedClientException =
          new UnauthorizedClientException(message);
            expect(exception instanceof UnauthorizedClientException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(401);
            expect(exception.status).not.toEqual(404);
          });
    });
