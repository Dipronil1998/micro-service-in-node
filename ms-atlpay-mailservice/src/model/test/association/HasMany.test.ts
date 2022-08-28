import {HasMany} from '../../association/HasMany';
import {Association} from '../../association/Association';

describe('Test cases of Association for HasMany', () => {
  test('Create Instance of HasMany', () => {
    const hasMany = new HasMany('name');
    expect(hasMany instanceof HasMany).toBe(true);
    expect(hasMany.name).toEqual('name');
    expect(hasMany).toBeDefined();
  });
  test('Test Case for saveStrategy', () => {
    const saveStrategy = new HasMany('saveStrategy');
    expect(typeof saveStrategy.saveStrategy('saveStrategy')).toBe('string');
    expect(saveStrategy.saveStrategy('saveStrategy')).toEqual('append');
  });
  test('Test Case for type fuction', () => {
    const type = new HasMany('type');
    expect(typeof type.type()).toBe('string');
    expect(type.type()).toEqual(Association.ONE_TO_MANY);
  });
});
