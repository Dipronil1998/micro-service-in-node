import {HasOne} from '../../assocaition/HasOne';
import {Association} from '../../assocaition/Association';

describe('Test cases of Association for HasOne', () => {
  test('Create Instance of HasOne', () => {
    const hasOne = new HasOne('name');
    expect(hasOne instanceof HasOne).toBe(true);
    expect(hasOne.name).toEqual('name');
    expect(hasOne).toBeDefined();
  });
  test('Test Case for type Fuction', () => {
    const type = new HasOne('type');
    expect(typeof type.type()).toBe('string');
    expect(type.type()).toEqual(Association.ONE_TO_ONE);
  });
});
