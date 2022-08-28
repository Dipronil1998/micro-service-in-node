import {unauthorizedClient}
  from '../../../config/bootstrap';
import {InvalidAppCredentialException}
  from '../InvalidAppCredentialException';

describe('Test cases of Invalid App credential Exception',
    () => {
      test('Test cases of Invalid App credential Exception',
          () => {
            const message: string = 'Invalid App credential';
            const exception: InvalidAppCredentialException =
          new InvalidAppCredentialException(message);
            expect(exception instanceof InvalidAppCredentialException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(401);
            expect(exception.status).toEqual(unauthorizedClient);
          });
    });
