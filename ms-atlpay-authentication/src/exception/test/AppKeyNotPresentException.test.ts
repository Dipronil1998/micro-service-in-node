import {AppKeyNotPresentException}
  from '../AppKeyNotPresentException';

describe('Test cases of App key not present Exception',
    () => {
      test('Test cases of App key not present Exception',
          () => {
            const message: string = 'App key not Present';
            const exception: AppKeyNotPresentException =
          new AppKeyNotPresentException(message);
            expect(exception instanceof AppKeyNotPresentException)
                .toBe(true);
            expect(exception.message).toEqual(message);
            expect(exception.status).toEqual(401);
          });
    });
