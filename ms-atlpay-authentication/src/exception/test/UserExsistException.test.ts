import {UserExsistException} from '../UserExsistException';

describe('Test cases of User Exsist Exception', () => {
  test('Test cases of User Exsist Exception', () => {
    const message: string = 'Email Already Exists';
    const exception: UserExsistException =
      new UserExsistException(message);
    expect(exception instanceof UserExsistException)
        .toBe(true);
    expect(exception.message).toEqual(message);
    expect(exception.status).toEqual(400);
    expect(exception.status).not.toEqual(404);
  });
});
