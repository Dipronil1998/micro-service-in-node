import {Association} from '../../assocaition/Association';
import {BelongsTo} from '../../assocaition/BelongsTo';

describe('Test cases of Association for BelongsTo', () => {
  test('Create Instance of BelongsTo', () => {
    const belongsTo = new BelongsTo('name');
    expect(belongsTo instanceof BelongsTo).toBe(true);
    expect(belongsTo.name).toEqual('name');
    expect(belongsTo).toBeDefined();
  });
  test('Test Case for typeFuction', () => {
    const type = new BelongsTo('type');
    expect(typeof type.type()).toBe('string');
    expect(type.type()).toEqual(Association.MANY_TO_ONE);
  });
});
