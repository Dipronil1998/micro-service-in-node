import {PageNotFoundException}
  from '../PageNotFoundException';

describe('Test cases of Page not found Exception',
    () => {
      test('Test cases of Page not found Exception',
          () => {
            const message: string = 'Page not found';
            const exception: PageNotFoundException =
          new PageNotFoundException(message, 404);
            expect(exception instanceof PageNotFoundException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(404);
          });
    });
