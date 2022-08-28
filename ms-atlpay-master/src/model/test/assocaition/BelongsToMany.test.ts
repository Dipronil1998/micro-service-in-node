import {Association} from '../../assocaition/Association';
import {BelongsToMany} from '../../assocaition/BelongsToMany';

describe('Test cases of Association for BelongsTo', () => {
  test('Create Instance of BelongsTo', () => {
    const belongsToMany = new BelongsToMany('name');
    expect(belongsToMany instanceof BelongsToMany).toBe(true);
    expect(belongsToMany.name).toEqual('name');
    expect(belongsToMany).toBeDefined();
  });

  test('Test Case for typeFuction', () => {
    const type = new BelongsToMany('type');
    expect(typeof type.type()).toBe('string');
    expect(type.type()).toEqual(Association.MANY_TO_MANY);
  });

  test('Getter methods', () => {
    const junctionTable: any = 'junctionTable';
    const junctionTableName: any = 'name';
    const belongsToMany = new BelongsToMany('name');

    belongsToMany.junctionTable=junctionTable;
    belongsToMany.junctionTableName=junctionTableName;
    expect(belongsToMany.junctionTable).toEqual(junctionTable);
    expect(belongsToMany.junctionTableName).toEqual(junctionTableName);
  });
});
