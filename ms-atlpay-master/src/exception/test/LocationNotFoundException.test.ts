import {LocationNotFoundException}
  from '../LocationNotFoundException';

describe('Test cases of Location Not Found Exception',
    () => {
      test('Test cases of Location Not Found Exception',
          () => {
            const message: string = 'Location Not Found';
            const exception: LocationNotFoundException =
          new LocationNotFoundException(message, 404);
            expect(exception instanceof LocationNotFoundException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(404);
          });
    });
